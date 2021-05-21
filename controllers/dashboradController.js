const pageRenderer = require('../utils/pageRenderer')

exports.dashboardGetController = (req, res, next) => {
    pageRenderer(req = req, res, path='pages/dashboard/dashboard', title='Dashboard')
}