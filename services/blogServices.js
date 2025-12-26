const db = require("../prisma/db.client");
const { prisma, Prisma } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getAllBlogsServices = async (start, stop) => {
  const allBlogs = await db.blog.findMany({
    include: {
      category: true,
      tags: true,
    },
  });
  const blogsDataForPagination = allBlogs.slice(start, stop);
  const blogsDataForHeader = allBlogs
    .filter((_, idx) => !(idx % 2))
    .slice(0, 3);
  const blogsDataForSidebar = allBlogs.filter((_, idx) => idx % 2).slice(0, 4);
  const allBlogsLength = await db.blog.count();

  return {
    blogsDataForPagination,
    blogsDataForHeader,
    blogsDataForSidebar,
    allBlogsLength,
  };
};

exports.getSingleCategoryService = async (catSlug, start, stop) => {
  const category = await db.category.findUnique({
    where: { slug: catSlug },
    include: {
      blogs: {
        include: {
          author: true,
          category: {
            select: {
              slug: true,
            },
          },
          tags: true,
        },
      },
    },
  });
  const blogsDataForPagination = category.blogs.slice(start, stop);
  const singleCategoryBlogsLength = category.blogs.length;

  return {
    category,
    blogsDataForPagination,
    singleCategoryBlogsLength,
  };
};

exports.getSingleBlogServices = async (cs, bs) => {
  const category = await db.category.findUnique({
    where: {
      slug: cs,
    },
  });
  if (category) {
    const singleBlog = await db.blog.findUnique({
      where: {
        slug: bs,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            category_image: true,
            slug: true,
          },
        },
        author: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            image_url: true,
            email: true,
            profession: true,
          },
        },
        tags: true,
      },
    });
    return singleBlog;
  } 
};


exports.getSearchBlogsResultsServises = async (searchStr, start, stop) => {
  searchStr =
    searchStr.split(" ").length === 1
      ? (searchStr = searchStr + ":*")
      : searchStr.split(" ").length > 1
      ? (searchStr = searchStr.split(" ").join(" & "))
      : (searchStr = undefined);

  const searchBlogsResult =
    await db.$queryRaw`SELECT *, (SELECT "blog_category_table"."slug" AS "category_slug" FROM "blog_category_table" WHERE "blog_blog_table"."categoryId" = "blog_category_table"."id" ) FROM "blog_blog_table" WHERE to_tsvector('russian', "blog_blog_table"."description") @@ to_tsquery('russian', ${searchStr})`;

  const searchBlogsResultForPagination = searchBlogsResult.slice(start, stop);
  const searchBlogsResultLength = searchBlogsResult.length;

  return {
    searchBlogsResultForPagination,
    searchBlogsResultLength,
  };
};
