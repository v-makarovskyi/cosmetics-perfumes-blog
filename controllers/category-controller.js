process.on("unhandledRejection", (err) => {
  console.log("НЕОБРАБОТАННАЯ АСИНХРОННАЯ ОШИБКА category-controller", err);
  throw err;
});

const categoryServises = require("../services/categoryServises");

exports.getAllCategories = (req, res, next) => {
  categoryServises
    .getAllCategoriesService()
    .then((categories) => {
      if (categories) {
        res.status(200).json(categories);
      }
    })
    .catch((err) => next(err));
};

exports.getSingleCategory = (req, res, next) => {
  const { categorySlug } = req.params;
  const { start, stop } = req.query;
  categoryServises
    .getSingleCategoryForPageService(categorySlug, +start, +stop)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
};

/* exports.getSearchSingleCategory = (req, res, next) => {
  let { category } = req.query;
  categoryServises
    .getSingleCategoryAfterSearchService(category)
    .then((category) => {
      return res.status(200).send([category]);
    })
    .catch(err => next(err))
};
 */