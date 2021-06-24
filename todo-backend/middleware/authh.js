var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./mydb.db')

module.exports = function(req, res, next){
    const username = req.headers.uname
    const password = req.headers.pass

    const stmt = db.prepare('SELECT uname FROM userlist WHERE uname=? AND pass=?')
    stmt.all(username, password, function(err, rows) {
        if(rows.length > 0){
            next()
        } else {
            res.send(401)
        }
        
    })
}