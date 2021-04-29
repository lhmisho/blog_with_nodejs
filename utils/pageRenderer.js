module.exports = (res, path, title='', error={}) => {
    res.render(path, {title: title, error: error})
}