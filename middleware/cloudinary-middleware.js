const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
const path = require("node:path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryImageUpload = (imageBuffer, identificator, baseUrl) => {
  return new Promise((resolve, reject) => {
    const suffix = baseUrl === "/api/users" ? "user" : "blog";
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: `${suffix}-${identificator}`,
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(imageBuffer);
    bufferStream.push(null);

    bufferStream.pipe(uploadStream);
  });
};

exports.saveImageCloudinary = async (req, res, next) => {
  if (req.files) {
    let imgData;
    try {
      if (req.files["blog_image"]) {
        const imageResult = await cloudinaryImageUpload(
          req.files["blog_image"][0].buffer,
          req.originalUrl.split("/").filter(Boolean)[3] +
            "_" +
            path.basename(
              req.files["blog_image"][0].originalname,
              path.extname(req.files["blog_image"][0].originalname)
            ),

          req.baseUrl
        );
        imgData = imageResult;
      }

      const tagsResult = JSON.parse(req.files["tags"][0].buffer);
      const total = {
        ...(tagsResult && { tags: tagsResult }),
        ...(imgData && { cloudinaryImageUrl: imgData.secure_url }),
      };
      req.total = total;
      next();
    } catch (error) {
      console.log("cloudinary-middleware error: ", error);
    }
  } else {
    try {
      const imageResult = await cloudinaryImageUpload(
        req.file.buffer,
        req.originalUrl.split("/").filter(Boolean)[3] +
          "_" +
          path.basename(
            req.file.originalname,
            path.extname(req.file.originalname)
          ),
          req.baseUrl
      );
      if(imageResult) {
        req.cloudinaryImageUrl = imageResult.secure_url
        next()
      } else {
        next()
      }
    } catch (error) {}
  }
};

