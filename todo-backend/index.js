const express = require('express')
const cors = require('cors')

const app = express()
var auth = require('./middleware/authh')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('mydb.db')

app.get('/', function(req, res){
    res.send('<form action="/todo" method="POST"><input name="desc"><button>Add</button></form>')
})

app.post('/todo', auth, function(req, res) {
    db.run('INSERT INTO masuk(desc) VALUES(?)', [req.body.desc], function(err, value) {
        if(err) throw err
        console.log("Berhasil Ditambahkan")
    })
    res.end()
})

app.get('/todo',auth , function(req, res) {
    db.serialize(()=>{
        db.all('SELECT * FROM masuk', function(err, rows, field){
            if(err){
                res.send("Error dalam mengambil data")
            }
            res.send(rows)
        })
    })
})

app.delete('/todo/:id', auth, function(req, res) {
    db.run("DELETE FROM masuk WHERE id = '"+req.params.id+"'")
    res.end('Data Dihapus')
})

app.get('/user', auth, function(req,res) {
    db.serialize(()=>{
        db.all("SELECT id, uname FROM userlist", function(err, rows, field){
            if(err){
                res.send("Error")
            }
            res.send(rows)
        })
    })
})

app.post('/user', function(req,res,next) {
    db.serialize(()=>{
        db.all("SELECT COUNT(*) as jmlhuser FROM userlist", (err, result)=>{
            var outpt = Object.values(result)
            if(outpt[0].jmlhuser > 0){
                auth(req,res,next)
            } else{
                next()
            }
        })
    })
},(req, res)=> {
    var uname = req.body.uname
    var pass = req.body.pass
    db.serialize(()=>{
        db.all('SELECT uname FROM userlist WHERE uname=?',[uname], function(err, rows, field) {
            if(rows.length > 1){
                res.send(401)
            } else {
                db.run('INSERT INTO userlist (uname, pass) VALUES (?,?)',[uname,pass], function(err, value){
                    if(err) {
                        res.end(500)
                        return
                    }
                })
                db.all('SELECT id, uname FROM userlist ORDER BY id DESC LIMIT 1', (err, rows, field) => {
                    res.send(rows)
                })
            }
        })
    })
})

app.delete('/user/:id', auth, (req,res,next)=>{
    db.serialize(()=>{
        db.all("SELECT COUNT(*) as jmlhuser FROM userlist", (err, value)=>{
            var outpt = Object.values(value)
            if(outpt[0].jmlhuser > 1){
                db.run("DELETE FROM userlist WHERE Id = '"+req.params.id+"'")
                res.end("Berhasil Dihapus")
            }
            else{
                res.send(404)
            }
        })
    })
})

app.listen(3000, function(){
    console.log('Server Berjalan')
})
