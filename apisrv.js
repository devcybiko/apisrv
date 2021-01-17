#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const apis = require('./apisrv-lib.js');
const glstools = require("glstools");
const gprocs = glstools.procs;
const path = require("path");

function main() {
    let opts = gprocs.args("-c");
    let configFile = opts.c[0] || "./apisrv-config.js";
    const apiConfig = require(path.resolve(process.cwd(), configFile));
    const staticPath = path.resolve(process.cwd(), apiConfig.staticDir);
console.log(staticPath);
    const app = express();
    let port = process.env.PORT || apiConfig.port || 8890;
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
    app.use("/api/*", apis(apiConfig.apiDir, apiConfig));
    app.use(express.static(staticPath));

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
