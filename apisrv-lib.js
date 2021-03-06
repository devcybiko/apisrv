let fs = require("fs");
let path = require("path");
let apis = {};
let config = {};
let basePath = "";

function readAPIDir(apiDir, config) {
    fs.readdirSync(apiDir) // read all the .js apis
        .filter(fname => fname.endsWith(".js") && fname[0] !== '.')
        .forEach(fname => {
            let fullName = path.resolve(apiDir,fname); //path.join(apiDir, fname);
            let parsed = path.parse(fullName);
            let apiName = parsed.name; // strip off the .js
            let apiPath = path.join(parsed.dir, parsed.base);
            let api = require(apiPath);
            // let newapi = new api(config[apiName]); // shouldn't it have access to all configs, eg: mysql configs?
            let newapi = new api(config);
            apis[apiName] = newapi;
        })
    fs.readdirSync(apiDir) // process all the subdirectories
        .filter(dirname => fs.statSync(path.join(apiDir, dirname)).isDirectory() && dirname[0] !== '.')
        .forEach(dirname => {
            let newAPIDir = path.join(apiDir, dirname);
            readAPIDir(newAPIDir, config[dirname]);
        })
}

apis.handler = function (req, res, data) {
    try {
        let apiList = req.params['0'].split("/");
        let api = this;
        for (let name of apiList) {
            if (!name) continue;
            let newapi = api[name];
            if (newapi.bind) newapi = newapi.bind(api);
            api = newapi;
        }
        return api(req, res, data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: JSON.stringify(err) });
    }
}

apis.use = function (req, res, next) {
    if (req.method === 'GET') return this.handler(req, res, req.query);
    else if (req.method === 'PUT') return this.handler(req, res, req.body);
    else if (req.method === 'POST') return this.handler(req, res, req.body);
    else if (req.method === 'DELETE') return this.handler(req, res, req.query);
    return next();
}

apis.init = function (theBasePath, theConfig = {}) {
    basePath = theBasePath;
    config = theConfig;
    readAPIDir(basePath, config);

    return apis.use;
}
apis.use = apis.use.bind(apis);
apis.init = apis.init.bind(apis);


module.exports = apis.init;
