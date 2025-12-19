const router = require("express").Router();
const blogsController = require("../controllers/blog-controller");
const cloudinaryMiddleware = require('../middleware/cloudinary-middleware')
const cloudinaryController = require('../controllers/cloudinary-controller')
const verify = require("../middleware/verify-user");

const multer = require("multer");
const upload = multer();

router.get("/", blogsController.getAllBlogs);
router.get("/search", blogsController.getSearchBlogsResult);
router.get("/:categorySlug", blogsController.getSingleCategory);
router.get(
  "/:categorySlug/blog-detail/:blogSlug",
  blogsController.getSingleBlog
),
  router.patch(
    "/blog-detail/:blogSlug/update",
    upload.fields([{name: "blog_image", maxCount: 1}, {name: 'tags', maxCount: 1}]),
    cloudinaryMiddleware.saveImageCloudinary, 
    blogsController.updateSingleBlog
  );

module.exports = router;
