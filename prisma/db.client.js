const { PrismaClient } = require("@prisma/client");
const moment = require("moment");

const prisma = new PrismaClient().$extends({
  result: {
    user: {
      profileName: {
        needs: {
          name: true,
          email: true,
        },
        compute(user) {
          return `${user.name}--${user.email}`;
        },
      },
    },
    blog: {
      created_at_for_client: {
        needs: {
          created_at: true,
        },
        compute(blog) {
          return moment(blog.created_at, "YYYYMMDD").fromNow();
        },
      },
    },
  },
});

module.exports = prisma;
