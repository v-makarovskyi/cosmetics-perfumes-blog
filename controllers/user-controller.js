const asyncHandler = require("express-async-handler");
const db = require("../prisma/db.client");
const { getCookieDecrypter } = require("../middleware/encrypt-cookie");
const AuthError = require("../errors/auth-error");

exports.get_user_profile = async (req, res, next) => {
  const profile = await db.user.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      wishlist: {
        include: {
          wishlist_blogs: {
            include: {
              author: {
                select: {
                  first_name: true,
                  last_name: true,
                },
              },
              category: {
                select: {
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const { password, ...otherData } = profile;

  res.status(200).json(otherData);
};

exports.update_user_profile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatingUser = await db.user.update({
      where: { id: req.userId },
      data: {
        name: name,
        email: email,
        user_image: req.cloudinaryImageUrl,
      },
      include: {
        wishlist: {
          include: {
            wishlist_blogs: true,
          },
        },
      },
    });

    const { password, ...updateUserDataForStore } = updatingUser;
    res.status(200).json({
      message: `Данные пользователя ${updatingUser.name} успешно обновлены.`,
      updateUserDataForStore,
    });
  } catch (error) {
    next(
      new Error(
        `❗️ Возникла проблема при попытке обновить данные пользователя ❗️`
      )
    );
  }
};

exports.addBlogToWishlist = async (req, res, next) => {
  const { blogSlug } = req.params;
  try {
    const user = await db.user.update({
      where: { id: req.userId },
      data: {
        wishlist: {
          update: {
            wishlist_blogs: {
              connect: { slug: blogSlug },
            },
          },
        },
      },
      include: {
        wishlist: {
          include: {
            wishlist_blogs: true,
          },
        },
      },
    });
    res.status(200).json({
      message: `Блог успешно добавлен в Избранное`,
      userAddBlogsData: user,
    });
  } catch (originalError) {
    console.log("Original Error", originalError);
  }
};

exports.deleteBlogFromWishlist = async (req, res, next) => {
  const { blogSlug } = req.params;
  try {
    const user = await db.user.update({
      where: { id: req.userId },
      data: {
        wishlist: {
          update: {
            wishlist_blogs: {
              disconnect: {
                slug: blogSlug,
              },
            },
          },
        },
      },
      include: {
        wishlist: {
          include: {
            wishlist_blogs: true,
          },
        },
      },
    });
    res.status(200).json({
      message: `Блог успешно удален из Избранного`,
      userDeleteBlogsData: user,
    });
  } catch (error) {
    console.log("Original Error", originalError);
  }
};

exports.get_user_data_for_store = asyncHandler(async (req, res, next) => {
  const user = await db.user.findUnique({
    where: { id: req.userId },
    include: {
      wishlist: {
        include: {
          wishlist_blogs: true,
        },
      },
    },
  });

  res.status(200).json(user);
});
