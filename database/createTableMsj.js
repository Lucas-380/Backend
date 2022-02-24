const { sqlite3 } = require('./options/SQLite3');
const knex = require('knex')(sqlite3);

//Creación de la tabla para los mensajes
knex.schema.createTable('message', table =>{
    table.string('email').notNullable();
    table.integer('mensaje').notNullable();
    table.string('fecha').defaultTo(knex.fn.now()).notNullable();
}).then(() => {
    console.log('Tabla de mensajes creada!');
}).catch((err) => {
    console.log(err);
}).finally(()=>{
    knex.destroy();
})