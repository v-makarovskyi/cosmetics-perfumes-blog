const router = require("express").Router();
const categoryController = require("../controllers/category-controller");

router.get("/", categoryController.getAllCategories);
//router.get('/searhSingleCategory', categoryController.getSearchSingleCategory)
router.get("/:categorySlug", categoryController.getSingleCategory)


module.exports = router;
