const mysql = require("mysql2");

const NAIWELogsConstructor = function (config) {
    this.config = config;
    this.connection = mysql.createConnection(config.mysql);
    this.connection.connect(err => console.log(err));
    this.query = function(req, res, sql, data) {
        this.connection.query(sql, data, function(err, rowset) {
            if (err) return res.status(500).send(err);
            return res.send(rowset);
        })
    }
}

module.exports = NAIWELogsConstructor;
