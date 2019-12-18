const sql = `select 'count' as x0, count(*) as y0 from rawlogs`;
const totalErrorCount = function(data, context, callback) {
    return this.query(sql, data, context, callback);
}
module.exports = totalErrorCount;