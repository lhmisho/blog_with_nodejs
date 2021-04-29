module.exports = (res, path, title = '', error = {}, value = {}) => {
    res.render(path, { title: title, error: error, value: value })
}