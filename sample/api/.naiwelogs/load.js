const mysql = require("mysql2");
const gls = require("./glsfiles.js");

const load = function (req, res, sql, data) {
    let config = this.config;
    let response = "";
    let responses = 0;
    let fnameCnt = 0;
    let fnames = gls.readDir(config['naiweConfig'].logDir);
    fnames.forEach(logFname => {
        if (!logFname.endsWith("_log")) return;
        fnameCnt++;
        let fullname = config['naiweConfig'].logDir + "/" + logFname;
        let rows = [];
        let lines = gls.readTextFile(fullname);
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let datetime = line.match(/(\d\d-...-\d\d\d\d \d\d:\d\d:\d\d UTC)/) || [""];
            let srcmodule = (line.match(/in (.+? on line \d+)/) || [""])[0];
            let timestamp = Date.parse(datetime[0]); // get ms
            if (isNaN(timestamp)) {
                datetime = new Date();
            } else {
                datetime = new Date(timestamp);
            }
            // console.log(datetime);
            let logtext = (logFname + ": " + line.trim()).substr(0, 750);
            let logerr = line.trim();
            if (line.includes(']')) 
                logerr = line.substring(line.indexOf(']') + 1).trim().substr(0, 750);
            
            if (line) 
                rows.push([datetime, logFname, logtext, logerr, srcmodule]);
            
        }
        let msg = `${logFname} ${
            rows.length
        }`;
        console.log(msg);
        response += "<br>" + msg;
        // console.log(rows);
        // rows.forEach(row => {
        let sql = "INSERT IGNORE INTO rawlogs (logtime, logname, logtext, logerr, srccode) VALUES ?";
        connection.query(sql, [rows], function (err, rowset) {
            responses++;
            // console.log(`${responses}...${fnameCnt}`);
            if (err) {
                console.error("bad..." + err.message);
                response += err.message;
            } else { // console.log(rowset);
                response += `<br>${responses}: ${
                    rowset.info
                }`;
            }
            if (responses === fnameCnt) {
                callback(null, response, context);
            }
        });
    });
}

module.exports = load;
