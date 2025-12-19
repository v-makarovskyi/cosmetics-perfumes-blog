const crypto = require("node:crypto");
const { Buffer } = require("node:buffer");

function validationDataForAlgoritm(algoritm, key) {
  if (!key) {
    throw new Error(
      `🚫Параметр 'key' обязателен при использовании алгоритма🚫`
    );
  }
  if (key.length !== 32) {
    const errorMsg = `Длина KEY при использовании ${algoritm} - не менее 32. Предоставлено: ${key.length}`;
    throw new TypeError(errorMsg);
  }
}

function getCookieEncrypter(str, options) {
  const iv = crypto.randomBytes(16);
  const { key, algoritm } = options;

  validationDataForAlgoritm(algoritm, key);

  const cipher = crypto.createCipheriv(algoritm, key, iv);
  const encryptedString = [
    iv.toString("hex"),
    ":",
    cipher.update(str, "utf-8", "hex"),
    cipher.final("hex"),
  ].join("");
  return encryptedString;
}

function getCookieDecrypter(encryptedStr, options) {
  const key = options.key;
  const algoritm = options.algoritm;

  validationDataForAlgoritm(algoritm, key);

  const encryptedArray = encryptedStr.split(":");
  const iv = Buffer.from(encryptedArray[0], "hex");
  const encryptedMainData = Buffer.from(encryptedArray[1], "hex");
  const decipher = crypto.createDecipheriv(algoritm, key, iv);
  const decryptedData =
    decipher.update(encryptedMainData, "hex", "utf-8") +
    decipher.final("utf-8");
  return decryptedData;
}

function encryptCookie(secret) {
  const options = {
    algoritm: "aes256",
    key: secret,
  };

  return (req, res, next) => {
    const originalResCookie = res.cookie;

    res.cookie = (name, value, opt) => {
      if (typeof value === "string") {
        return originalResCookie.call(res, name, value, opt);
      }

      const val =
        name === "user" && typeof value === "object"
          ? `${JSON.stringify(value)}`
          : String(value);

      const encryptedValue = `__e_:${getCookieEncrypter(val, options)}`;
      return originalResCookie.apply(res, [name, encryptedValue, opt]);
    };

    next();
  };
}


exports.getCookieEncrypter = getCookieEncrypter;
exports.getCookieDecrypter = getCookieDecrypter;
exports.encryptCookie = encryptCookie; 



