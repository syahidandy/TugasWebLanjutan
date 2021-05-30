const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('mydb.db')
db.run('CREATE TABLE IF NOT EXISTS masuk(desc TEXT)');

app.get('/', function(req, res){
    res.send('<form action="/todo" method="POST"><input name="desc"><button>Add</button></form>')
})

app.post('/todo', function(req, res) {
    db.run('INSERT INTO masuk(desc) VALUES(?)', [req.body.desc])
    res.end("Berhasil Ditambahkan")
})

app.get('/todo', function(req, res) {
    db.serialize(()=>{
        db.all('SELECT * FROM masuk', function(err, rows, field){
            if(err){
                res.send("Eror dalam mengambil data")
            }
            res.send(rows)
        })
    })
})

app.delete('/todo/:id', function(req, res) {
    db.run("DELETE FROM masuk WHERE Id = '"+req.params.id+"'")
    res.end('Data Dihapus')
})


app.listen(3000, function(){
    console.log('Server Berjalan')
})
