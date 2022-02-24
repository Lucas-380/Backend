const { mysql } = require('./options/mariaDB');
const knex = require('knex')(mysql);

//Creación de la tabla para los productos
knex.schema.createTable('productos', table =>{
    table.increments('id').notNullable();
    table.string('title').notNullable();
    table.integer('price').notNullable();
    table.string('thumbnail').notNullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now()).notNullable();
}).then(() => {
    console.log('Tabla de productos creada!');
}).catch((err) => {
    console.log(err);
}).finally(()=>{
    knex.destroy();
})