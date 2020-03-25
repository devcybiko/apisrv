config = {
    "env" : process.env,
    "mysql": {
        "host": "public-scratch.cvwwn9esnrpn.us-east-1.rds.amazonaws.com",
        "port": 3306,
        "user": "root",
        "password": "hokxan9AWS",
        "database": "naiwe"
    },
    "naiweConfig": {
        "logDir": "/Users/greg/Dropbox/git/naiwe-logs",
        "cwd": "/Users/greg/Dropbox/git/naiwe-site"
    }
}
module.exports = config;