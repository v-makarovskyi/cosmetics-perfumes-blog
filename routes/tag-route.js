const router = require('express').Router()
const tagController = require('../controllers/tag-controller')

router.get('/', tagController.getAllTags)

module.exports = router
