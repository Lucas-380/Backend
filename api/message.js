const PersistenciaMessage = require('../memory/persistenciaMsj');

class Message {
    async readMessage(){
        let data = await PersistenciaMessage.readMessage();
        return data;
    }
    
    async saveMessage(msj) {
        const message = await PersistenciaMessage.saveMessage(msj);
        return message;
    }
}

module.exports = new Message();