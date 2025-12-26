const router = require("express").Router();
const userController = require("../controllers/user-controller");
const verify = require("../middleware/verify-user");
const cloudinaryMiddleware = require('../middleware/cloudinary-middleware')

const multer = require('multer')

const upload = multer()

router.get("/profiles/:id", userController.get_user_profile);
router.get(
  "/get_user_for_store",
  verify.verifyUser,
  userController.get_user_data_for_store
);
router.post(
  "/profiles/:id/profile/update",
  verify.verifyUser,
  upload.single('user_image'),
  cloudinaryMiddleware.saveImageCloudinary,
  userController.update_user_profile
);
router.post(
  "/wishlist-add/:blogSlug",
 verify.verifyUser, 
  userController.addBlogToWishlist
);

router.post("/wishlist-delete/:blogSlug", verify.verifyUser, userController.deleteBlogFromWishlist)

module.exports = router;
