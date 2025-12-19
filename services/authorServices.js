const db = require('../prisma/db.client')

exports.getAllAuthorsService = () => {
    const allAuthors = db.author.findMany({})
    return new Promise((resolve) => {
        resolve(allAuthors)
    })
}