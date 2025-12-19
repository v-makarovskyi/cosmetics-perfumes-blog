const db = require("../prisma/db.client");

exports.getAllTagsService = () => {
    return Promise.resolve(db.tag.findMany({}))
}