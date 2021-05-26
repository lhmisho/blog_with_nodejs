const authRoutes = require('./authRouts')
const dashboardRoutes = require('./dashboardRouts')
const validatorRoutes = require('../palyground/validator')
const routers = [
    {
        path: '/auth',
        handler: authRoutes
    },
    {
        path: '/dashboard',
        handler: dashboardRoutes
    },
    {
        path: '/playgroud',
        handler: validatorRoutes
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                message: "Hello world"
            })
        }
    },
]

module.exports = app => {
    routers.forEach(router => {
        app.use(router.path, router.handler)
    })
}
