/* process.on("unhandledRejection", (err) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", err);
  throw err;
}); */

const jwt = require("jsonwebtoken");
const AuthError = require("../errors/auth-error");
const {
  addRefreshToketToWhiteList,
  findRefreshToken,
  makeTokenInvalid,
} = require("../services/authServices");
const { findUserById } = require("../services/userServices");
const { generateTokens } = require("../utils/generate-tokens");

/* "🚫 У вас недостаточно прав для доступа к указанному ресурсу. Обратитесь к адмнистратору: makarovskyi.v@gmail.com 🚫" */

exports.verifyUser = async (req, res, next) => {
  const originalCookies = req.cookies;
  try {
    if (!Object.keys(originalCookies).includes("accessToken")) {
      throw new AuthError(
        403,
        "🚫 У вас недостаточно прав для доступа к указанному ресурсу. Обратитесь к адмнистратору: makarovskyi.v@gmail.com 🚫"
      );
    }

    const { accessToken } = originalCookies;
    const { userId } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const targetUser = await findUserById(userId);

    req.userId = targetUser.id;

    next();
  } catch (error) {
    if (error instanceof AuthError) {
      return next(error);
    } else if (error.name === "TokenExpiredError") {
      console.log(error.meesage);
      const { refreshToken } = originalCookies;
      if (!refreshToken) {
        return next(
          new AuthError(400, "RefreshToken должен присутствовать обязательно!")
        );
      }
      const savedRefreshToken = await findRefreshToken(refreshToken);
      if (
        !savedRefreshToken ||
        savedRefreshToken.revoked ||
        Date.now() >= savedRefreshToken.expire_at.getTime()
      ) {
        return next(
          new AuthError(
            401,
            '"Unauthorized -- token." + " Нужно войти в систему повторно"'
          )
        );
      }
      const user = await findUserById(savedRefreshToken.userId);
      req.userId = user.id;
      if (!user) {
        return next(
          new AuthError(
            401,
            "Unauthorized-user." + " Нужно войти в систему повторно"
          )
        );
      }
      await makeTokenInvalid(savedRefreshToken.id);
      const { accessToken, refreshToken: newRefreshToken } =
        generateTokens(user);
      await addRefreshToketToWhiteList({
        refreshToken: newRefreshToken,
        userId: user.id,
      });

      res
        .cookie("accessToken", accessToken, {
          httpOnly: false,
          secure: false,
          sameSite: "strict",
        })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
      next();
    }
  }
};

/* exports.verifyUser = async (req, res, next) => {
  const auth = req.cookies;
  try {
    Object.keys(auth).length === 0 ||
    !Object.keys(auth).includes("accessToken")
  } catch (error) {
    
  }
  if (
    Object.keys(auth).length === 0 ||
    !Object.keys(auth).includes("accessToken")
  ) {
    next(
      new AuthError(
        403,
        "🚫 У вас недостаточно прав для доступа к указанному ресурсу. Обратитесь к адмнистратору: makarovskyi.v@gmail.com 🚫"
      )
    );
  }
  const { accessToken } = auth;
  try {
    const { userId } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const user = await findUserById(userId);

    req.userId = user.id;
    next()
  } catch (error) {
    if (error.name === "TokenExpiredError") {
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
        next(
          new AuthError(
            401,
            "Unauthorized -- token." + " Нужно войти в систему повторно"
          )
        );
      }

      const user = await findUserById(savedRefreshToken.userId);
      req.userId = user.id;

      if (!user) {
        return next(
          new AuthError(
            401,
            "Unauthorized-user." + " Нужно войти в систему повторно"
          )
        );
      }

      await makeTokenInvalid(savedRefreshToken.id);

      const { accessToken, refreshToken: newRefreshToken } =
        generateTokens(user);
      await addRefreshToketToWhiteList({
        refreshToken: newRefreshToken,
        userId: user.id,
      });

      res
        .cookie("accessToken", accessToken, {
          httpOnly: false,
          secure: false,
          sameSite: "strict",
        })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
    }
  }
  next();
}; */

exports.verifyAdmin = async (req, res, next) => {
  try {
    const status = req.body.user["is_admin"];
    if (!status) {
      return next(
        new AuthError(401, "Недостаточно прав для получения ресурса")
      );
    }
    next();
  } catch (error) {
    console.error(error);
  }
};
