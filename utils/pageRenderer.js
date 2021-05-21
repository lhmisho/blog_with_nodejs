/**
 * a custom render functin with minimul necessery response arg
 * @param {String} res [get response arg for send response]
 * @param {String} path [page path of the controller]
 * @param {String} title [page title]
 * @param {Object} error [error object default {}]
 * @param {Object} value [values of request form to cache the form value for a form]
 */
const Flash = require('../utils/Flash')


module.exports = (req, res, path, title = '', error = {}, value = {}) => {
    res.render(path, { title: title, error: error, value: value, flashMessage:  Flash.getMessage(req)})
}