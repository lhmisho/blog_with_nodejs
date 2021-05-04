const pageRenderer = require('../utils/pageRenderer')

exports.dashboardGetController = (req, res, next) => {
    pageRenderer(res, path='pages/dashboard/dashboard', title='Dashboard')
}