module.exports = function(req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
};