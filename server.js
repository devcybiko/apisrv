#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
let apiConfig = require(`./apisrv-config.js`);
const apis = require('./lib/apisrv');

const app = express();
var port = process.env.PORT || 8890;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use("/api/*", apis(__dirname+"/api", apiConfig));

function main() {
    app.listen(port, function (err) {
        if (err) {
            console.log(err);
        } else {
            var port = this._connectionKey.split(":")[4];
            console.log('server listening on PORT ' + port);    
        }
    });
}

main();
