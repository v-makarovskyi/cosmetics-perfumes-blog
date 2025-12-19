const db = require("../prisma/db.client");

exports.getAllCategoriesService = () => {
  return new Promise((resolve, reject) => {
    const allCategories = db.category.findMany();
    if (allCategories !== undefined) {
      resolve(allCategories);
    } else {
      reject(
        new Error("Что-то пошло не так при получении списка всех категорий")
      );
    }
  });
};

exports.getSingleCategoryForPageService = (slug, start, stop) => {
  return new Promise((resolve, reject) => {
    const category = db.category.findUnique({
      where: { slug},
      include: {
        blogs: {
          include: {
            author: true,
            tags: true,
            category: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });
    resolve(category);
  }).then((category) => {
    return new Promise((resolve, reject) => {
      if (category == undefined) {
        reject(new Error("Not find category"));
      } else {
        const blogsDataForPagination = category.blogs.slice(start, stop);
        const singleCategoryBlogsLength = category.blogs.length;
        resolve({
          category,
          blogsDataForPagination,
          singleCategoryBlogsLength,
        });
      }
    });
  })
};

/* exports.getSingleCategoryAfterSearchService = (cat) => {
  return new Promise((resolve, reject) => {
    const category = db.category.findUnique({
      where: {name: cat},
      select: {
        name: true,
        slug: true
      }
    })
    resolve(category)
  })
}
 */