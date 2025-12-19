const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const AuthError = require("../errors/auth-error");
const { generateTokens } = require("../utils/generate-tokens");
const {
  addRefreshToketToWhiteList,
  findRefreshToken,
  makeTokenInvalid,
  deleteAllRefreshTokens,
} = require("../services/authServices");
const {
  createUserWithEmailAndPassword,
  findUserById,
  findUserByEmail,
  createWishlistForUser,
} = require("../services/userServices");

exports.register = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage('Поле "NAME" не должно быть пустым')
    .isLength({ min: 4, max: 21 })
    .withMessage(
      'Поле "NAME" не должно быть меньше 3-х не должно превышать 21 символ'
    ),
  body("email")
    .trim()
    .isEmail()
    .withMessage("EMAIL: Введите валидное значение для поля")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage('Поле "ПАРОЛЬ" не должно быть пустым')
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать не менее 6-ти символов"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const targetUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    if (!errors.isEmpty()) {
      return next({ validationErrors: errors, statusCode: 400 });
    }

    const existUser = await findUserByEmail(targetUser.email);

    if (existUser) {
      next(new AuthError(401, "🚫 Данный email уже используется! 🚫"));
    } else {
      const newUser = await createUserWithEmailAndPassword(targetUser);

      const { password, ...other } = newUser;

      res.status(201).json({
        message: `Пользователь ${targetUser.name} успешно создан`,
        userData: other,
      });
    }
  }),
];

exports.login = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("EMAIL: Введите валидное значение для поля")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage('Поле "ПАРОЛЬ" не должно быть пустым')
    .isLength({ min: 6 })
    .withMessage("Пароль должен содержать не менее 6-ти символов"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const targetUser = {
      email: req.body.email,
      password: req.body.password,
    };

    if (!errors.isEmpty()) {
      next({ validationErrors: errors, statusCode: 400 });
    }

    const existUser = await findUserByEmail(targetUser.email);
    if (!existUser) {
      next(new AuthError(401, "🚫 Введите валидные данные(email) 🚫"));
    }

    const mathedPassword = await bcrypt.compare(
      targetUser.password,
      existUser.password
    );
    if (!mathedPassword) {
      return next(
        new AuthError(401, "🚫 Введите валидные данные(password) 🚫")
      );
    }

    await createWishlistForUser(existUser);

    const { accessToken, refreshToken } = generateTokens(existUser);

    await addRefreshToketToWhiteList({
      refreshToken,
      userId: existUser.id,
    });

    const { id, name, ...userData } = existUser;

    res
      .cookie("accessToken", accessToken, {
        httpOnly: false,
        sameSite: "strict",
        secure: false,
        priority: "high",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        priority: "high",
      });

    res.status(200).json({
      message: "Вход в систему выполнен успешно!",
      id,
      name,
    });
  }),
];

exports.logout = async (req, res, next) => {
  const refreshToken = req.cookies["refreshToken"];

  try {
    await deleteAllRefreshTokens(refreshToken);
    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({
        message: `Пользователь успешно вышел из системы. До встречи!`,
      });
  } catch (ignoted) {
    next(new Error("❗️ Возникла проблема при попытке выйти из системы ❗️"));
  }
};
