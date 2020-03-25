let funConstructor = function (config) {
    this.data = function(req, res, data) { // api/fun/data?arg=0
        let results = [];
        results.push(`{"a":"alpha", "b":"beta", "c": "gamma"}`);
        results.push(`{"superman":"clark kent", "batman":"bruce wayne", "spider-man": "peter parker"}`);
        return res.send(results[+data.arg]);
    }
}

module.exports = funConstructor;