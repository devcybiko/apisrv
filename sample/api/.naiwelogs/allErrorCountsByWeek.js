const sql = `select logname as label, concat('week', WEEKOFYEAR(logtime)) as x0, count(logtext) as y0 from rawlogs GROUP BY logname, WEEKOFYEAR(logtime) ORDER BY logname, x0, y0`;
weeklyCounts = function(req, res, data) {
    return this.query(req, res, sql, data);
}
module.exports = weeklyCounts;
