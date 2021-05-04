const router = require('express').Router()
const { dashboardGetController } = require('../controllers/dashboradController')
const isAuthenticatedMiddleware = require('../middleware/isAuthenticatedMiddleware')

router.get('/', isAuthenticatedMiddleware, dashboardGetController)


module.exports = router