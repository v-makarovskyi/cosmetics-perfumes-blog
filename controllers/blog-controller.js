/* process.on("unhandledRejection", (err) => {
  console.log("НЕОБРАБОТАННАЯ АСИНХРОННАЯ ОШИБКА user-controller", err);
  throw err;
});
 */

const blogServices = require("../services/blogServices");
const db = require("../prisma/db.client");
const asyncHandler = require("express-async-handler");

exports.getAllBlogs = async (req, res, next) => {
  const { start, stop } = req.query;
  try {
    const result = await blogServices.getAllBlogsServices(+start, +stop);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getSingleCategory = async (req, res, next) => {
  const { categorySlug } = req.params;
  const { start, stop } = req.query;
  try {
    const result = await blogServices.getSingleCategoryService(
      categorySlug,
      start,
      stop
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getSingleBlog = async (req, res, next) => {
  try {
    const { categorySlug, blogSlug } = req.params;
    const result = await blogServices.getSingleBlogServices(
      categorySlug,
      blogSlug
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateSingleBlog = asyncHandler(async (req, res, next) => {
  const { blogSlug } = req.params;
  const { tags, cloudinaryImageUrl } = req.total;
  const { title, category, author, read_time, description } = req.body;

  const updatedBlog = await db.blog.update({
    where: { slug: blogSlug },
    data: {
      title: title,
      authorId: author,
      categoryId: category,
      description: description,
      read_time: read_time,
      main_image: cloudinaryImageUrl,
      tags: {
        set: tags.map(t => ({name: t.label})),
      },
    },
  });
  res.status(200).json(updatedBlog);
});

exports.getSearchBlogsResult = async (req, res, next) => {
  const { searchData, start, stop } = req.query;
  try {
    const result = await blogServices.getSearchBlogsResultsServises(
      searchData,
      +start,
      +stop
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};



//Я протестировала для вас самые известные корейские средства.