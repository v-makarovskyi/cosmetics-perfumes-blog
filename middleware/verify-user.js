const jwt = require("jsonwebtoken");
const AuthError = require("../errors/auth-error");
const { findUserById } = require("../services/userServices");

exports.verifyUser = async (req, res, next) => {
  try {
    const auth = req.cookies;
    if (Object.keys(auth).length === 0) {
      return next(
        new AuthError(
          403,
          "🚫 У вас недостаточно прав для доступа к указанному ресурсу. Обратитесь к адмнистратору: makarovskyi.v@gmail.com 🚫"
        )
      );
    }
    const { accessToken } = auth;
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET,
      async (err, decoded) => {
        if (err) {
          let resourseUrl = req.url ? req.url : ''
          req.body.targetUrl = req.baseUrl + resourseUrl;
          return next(err);
        } else {
          const { userId, exp } = decoded;
          const user = await findUserById(userId);
          req.body.user = user;
          next();
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.verifyAdmin = async (req, res, next) => {
  console.log('REQ BODY USER: ', req.body);
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
