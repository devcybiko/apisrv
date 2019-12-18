const mysql = require("mysql2");
/*
    constructor...
    api(inputObj, context, callback)
    callback(err, resultObj, context);
*/

// connect(connection, context, callback) => callback(err, connection, context)
// query({query:string}, context, callback) => callback(err, rowset, context)
let MySQLConstructor = function (config) {
    this.connection = mysql.createConnection(config);
    this.connection.connect(err => console.log(err));
    this.query = function(req, res, data) {
        this.connection.query(data.query, {}, function (err, rowset) {
            console.log(data.query);
            if (err) return res.status(500).send(err);
            return res.send(rowset);
        });
    }
}

module.exports = MySQLConstructor;