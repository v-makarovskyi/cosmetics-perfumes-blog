/* const cloudinary = require("../utils/cloudinary");
const { Readable } = require("stream");

exports.cloudinaryImageUpload = (imageBuffer, identificator, baseUrl) => {
  return new Promise((resolve, reject) => {
    const preffix = baseUrl === '/api/blogs' ? 'blog' : 'user'
    const uploadStream = cloudinary.uploader.upload_stream(
      {
       
        public_id: `${preffix}_${identificator}`,
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
  */