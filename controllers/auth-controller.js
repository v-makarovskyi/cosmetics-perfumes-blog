const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const AuthError = require("../errors/auth-error");
const { generateTokens } = require("../utils/generate-tokens");
const {
  addRefreshToketToWhiteList,
  findRefreshToken,
  makeTokenInvalid,
} = require("../services/authServices");
const {
  createUserWithEmailAndPassword,
  findUserById,
  findUserByEmail,
} = require("../services/userServices");

exports.register = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage('Поле "NAME" не должно быть пустым')
    .isLength({ min: 4, max: 21 })
    .withMessage(
      'Поле "NAME" не должно быть меньше 2-х не должно превышать 21 символ'
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
    try {
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

        const { password, ...other } = newUser

        res.status(201).json({
          message: `Пользователь ${targetUser.name} успешно создан`,
          userData: other,
        });
      }
    } catch (error) {
      console.error("ERROR-AuthController", error);
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
    try {
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
        return next(new AuthError(401, "🚫 Введите валидные данные(email) 🚫"));
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

      const { accessToken, refreshToken } = generateTokens(existUser);
      await addRefreshToketToWhiteList({
        refreshToken,
        userId: existUser.id,
      });

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

      const { password, ...userData } = existUser;

      res.status(200).json({
        message: "Вход в систему выполнен успешно!",
        userData,
      });
    } catch (error) {
      console.error(error);
    }
  }),
];

exports.get_refresh_token = asyncHandler(async (req, res, next) => {
  
  let address = Object.entries(req.query).map(el => el.join('/')).join('/')
  console.log('address', address);

  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(
      new AuthError(400, "RefreshToken должен присутствовать обязательно!")
    );
  }

  const savedRefreshToken = await findRefreshToken(refreshToken);

  if (
    !savedRefreshToken ||
    savedRefreshToken.revoked === true ||
    Date.now() >= savedRefreshToken.expire_at.getTime()
  ) {
    return next(new AuthError(401, "Unauthorized -- token"));
  }

  const user = await findUserById(savedRefreshToken.userId);
  if (!user) {
    return next(new AuthError(401, "Unauthorized-user"));
  }

  await makeTokenInvalid(savedRefreshToken.id);
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

  await addRefreshToketToWhiteList({
    refreshToken: newRefreshToken,
    userId: user.id,
  });

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })

    .redirect(`/${address}`)
});
