/* const fs = require("fs");
const cloudinaryServices = require("../services/cloudinaryServices");
const asyncHandler = require("express-async-handler");
 
exports.saveImageController = asyncHandler(async(req, res, next) => {
  console.log('req.file', req.file)
  console.log('req.files', req.files)
  console.log('body', req.body)
})
 

exports.saveImageCloudinary = asyncHandler(async (req, res, next) => {
  const single = req.file || req.files["blog_image"][0];
  if (single) {
    const result = await cloudinaryServices.cloudinaryImageUpload(
      single.buffer,
      `${
        req.baseUrl === "/api/blogs"
          ? req.originalUrl.split("/").filter(Boolean)[3]
          : req.userId
      }`,

      req.baseUrl
    );
    req.cloudinaryImageSaveResult = result.secure_url;
    next();
  }
  if(req.files['tags']) {
    console.log( req.files['tags'][0])
  }
});
  */