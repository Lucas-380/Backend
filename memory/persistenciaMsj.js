const { sqlite3 } = require('../database/options/SQLite3');
const knex = require('knex')(sqlite3);

class PersistenciaMessage{
    async readMessage(){
        try {
            let msj = await knex.from('message').select("*");
            return msj;
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async saveMessage(msj){
        try{
            let message = await knex('message').insert(msj);
            return message;
        }catch(err){
            console.log(err);
            throw err
        }
    }
}

module.exports = new PersistenciaMessage();