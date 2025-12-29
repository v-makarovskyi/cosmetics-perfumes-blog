require("dotenv").config();
const path = require("path");
var express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const globalErrorHandler = require("./middleware/global-error-handler");
const { encryptCookie } = require("./middleware/encrypt-cookie");

const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-route");
const blogRouter = require("./routes/blog-route");
const categoryRouter = require("./routes/category-route");
const authorRouter = require("./routes/author-route");
const tagRouter = require("./routes/tag-route");
const uploadRouter = require("./routes/upload-route");
const cloudinaryRouter = require("./routes/cloudinary-router");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));

app.use(
  cors({
    origin: function (origin, cb) {
      if (
        [
          "https://cosmetics-perfumes-blog.vercel.app",
          "http://localhost:8080",
        ].indexOf(origin) !== -1
      ) {
        cb(null, true);
      } else {
        cb(new Error("CORS не разрешен!"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);
app.use(cookieParser());

//app.use(encryptCookie(process.env.COOKIE_SECRET_KEY));

/* 
app.use(
  "/uploads",
  express.static(path.join(__dirname, "client", "public", "images", "uploads"), {
    dotfiles: 'ignore',
    etag: true,
    
  })
); */
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/authors", authorRouter);
app.use("/api/tags", tagRouter);
app.use("/api/upload", uploadRouter);
//app.use('/api/cloudinary', cloudinaryRouter)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    errorName: "Resourse Not Found",
    errorMessagesArray: [
      {
        type: "resourse",
        name: "This Resourse Not Found",
        location: req.originalUrl,
        message: "This Resourse Not Found",
      },
    ],
  });
});

module.exports = app;
