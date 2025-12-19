const bcrypt = require("bcrypt");
const db = require("../prisma/db.client");

const createUserWithEmailAndPassword = async (user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  return await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
};

const findUserById = async (id) => {
  return await db.user.findUnique({ where: { id } });
};

const findUserByEmail = async (email) => {
  return await db.user.findUnique({
    where: { email },
  });
};

const createWishlistForUser = async (user) => {
  return await db.wishlist.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id
    }, 
    update: {}
  });
};

module.exports = {
  createUserWithEmailAndPassword,
  findUserById,
  findUserByEmail,
  createWishlistForUser,
};
