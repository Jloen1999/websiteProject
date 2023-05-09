const mysql = require('mysql');
const host = 'localhost';
const user = 'jloen';
const password = 'Erick1999';
const database = 'confesionario'
const table = 'coche'
const port = 3306;
const consult = `SELECT * FROM ${table}`;

const express = require('express');

const app = express();
const portService = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const connection = mysql.createConnection(
    {
        host,
        user,
        password,
        database,
        port
    }
)

connection.connect(err =>{
        if(err) throw err;
        console.log('Conexion exitosa');
})

app.get('/coches', (req, res) => {
        connection.query(consult, (err, registers, fields) => {
                if(err) throw err;
                res.render('index', {
                        coches: registers,
                        columnas: fields
                })
        })
})

app.use((req, res, next) => {
        res.status(404).render('404', {header: '404'});
})

app.listen(portService, () => {
        console.log(`Servidor corriendo en http://localhost:${portService}`)
})

