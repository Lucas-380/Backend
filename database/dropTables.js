const { default: knex } = require('knex');
const { mysql } = require('./options/mariaDB'); //Tabla de productos
const { sqlite3 } = require('./options/SQLite3'); //Tabla de mensajes

const knexProd = require('knex')(mysql);
const knexMsj = require('knex')(sqlite3);

// Drop tabla de productos (mysql)
knexProd.schema.dropTableIfExists('productos').then(()=>{
        console.log('Tabla eliminada')
    }).catch((err) =>{
        console.log(err);
    }).finally(()=>{
        knexProd.destroy();
    })

// Drop tabla mensajes (SQLite3)
knexMsj.schema.dropTableIfExists('message').then(()=>{
        console.log('Tabla eliminada')
    }).catch((err) =>{
        console.log(err);
    }).finally(()=>{
        knexMsj.destroy();
    })
