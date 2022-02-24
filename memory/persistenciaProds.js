const { mysql } = require('../database/options/mariaDB');
const knex = require('knex')(mysql);

class PersistenciaProduct{
    async save(prod){
        try{
           let producto = await knex('productos').insert(prod);
           return producto
        }catch(err){
            console.log(err);
            throw err
        }
    }

    async getById(id){
        try{
            let producto = await knex.from('productos').where('id', id).select("*");
            return producto
        }catch(err){
            console.log(err);
            throw err
        }
    }

    async getAll(){
        try{
            let producto = await knex.from('productos').select("*");
            return producto
        }catch(err){
            console.log(err);
            throw err
        }
    }
    
    async deleteById(id){
        try{
            await knex('productos').where('id', id).del();
        }catch(err){
            console.log(err);
            throw err
        }
    }

    async deleteAll(){
        try{
            await knex('productos').del();
        }catch(err){
            console.log(err);
            throw err
        }
    }

    async update(id, body){
        try{
            let updateProd = await knex('productos').where('id', id).update(body);
            return updateProd;
        }catch(err){
            console.log(err);
            throw err
        }
    }
}

module.exports = new PersistenciaProduct();