const blogServices = require("../services/blogServices");
const db = require("../prisma/db.client");

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

exports.updateSingleBlog = async (req, res, next) => {
  const { blogSlug } = req.params;
  const { tags, cloudinaryImageUrl } = req.total;
  const { title, category, author, read_time, description } = req.body;
  const updateSingleBlogOptions = {
    formDataOptions: {
      title,
      category,
      author,
      read_time,
      description,
      tags,
      cloudinaryImageUrl,
    },
    slug: blogSlug,
  };
  try {
    const updatedSingleBlog = await blogServices.updateSingleBlogServices(
      updateSingleBlogOptions
    );
    res.status(201).json(updatedSingleBlog);
  } catch (error) {}
};
