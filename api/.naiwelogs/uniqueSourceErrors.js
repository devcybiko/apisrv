const sql = `SELECT DISTINCT srccode FROM rawlogs`;
const uniqueSourceErrors = function(data, context, callback) {
    return this.query(sql, data, context, callback);
}
module.exports = uniqueSourceErrors;