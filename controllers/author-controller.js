const authorServices = require("../services/authorServices");

exports.getAllAuthors = (req, res, next) => {
  authorServices
    .getAllAuthorsService()
    .then((authors) => {
      res.status(200).json(authors);
    })
    .catch((err) => {
      console.log(
        `Что-то пошло не так при попытке получить данные авторов блогов.`
      );
      next(err);
    });
};
