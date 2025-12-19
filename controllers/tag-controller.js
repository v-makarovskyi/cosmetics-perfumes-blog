const tagServices = require("../services/tagServiseces");

exports.getAllTags = async (req, res, next) => {
  try {
    const tags = await tagServices.getAllTagsService();
    res.status(200).json(tags)
  } catch (error) {
    console.log("Что-то пошло не так при попытке загрузить данные тегов");
    console.log(error);
  }
};
