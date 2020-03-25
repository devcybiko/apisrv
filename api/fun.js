let fundataConstructor = function (config) {
    this.data = function(req, res, data) {
        return res.send({"a":"alpha", "b":"beta", "c": "gamma"});
    }
}

module.exports = MySQLConstructor;