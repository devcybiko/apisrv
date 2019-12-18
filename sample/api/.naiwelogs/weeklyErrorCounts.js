const sql = `select WEEKOFYEAR(logtime) as x0, count(logtext) as y0 from rawlogs GROUP BY WEEKOFYEAR(logtime) ORDER BY x0, y0`;
weeklyCounts = function(data, context, callback) {
    return this.query(sql, data, context, callback);
}
module.exports = weeklyCounts;
