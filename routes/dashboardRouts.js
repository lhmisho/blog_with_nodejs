const router = require('express').Router()
const { dashboardGetController } = require('../controllers/dashboradController')

router.get('/', dashboardGetController)


module.exports = router