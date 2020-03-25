const sql = `select logname as x, count(logname) as y from rawlogs WHERE logtime >= DATE(NOW()) - INTERVAL 7 DAY GROUP BY logname ORDER BY y DESC LIMIT 5;
`;
const logCounts = function(data, context, callback) {
    return this.query(sql, data, context, callback);
}
module.exports = logCounts;