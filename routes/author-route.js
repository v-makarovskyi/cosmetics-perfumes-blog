const router = require('express').Router()
const authorController = require('../controllers/author-controller')

router.get('/', authorController.getAllAuthors)

module.exports = router