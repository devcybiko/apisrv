const sql = `SELECT DISTINCT logerr FROM rawlogs WHERE logerr like '%PHP%'`;
const uniqueErrors = function(data, context, callback) {
    return this.query(sql, data, context, callback);
}
module.exports = uniqueErrors;