const fs = require("fs")

class Message {
    constructor() {
        this.message = [];
    }
    readMessage(){
        try {
           let data = fs.readFileSync("./message.txt", "utf-8");
            if(data){
                this.message = JSON.parse(data);
            }
            return this.message;
        }
        catch(err){
            console.log(err);
        }

    }
    saveMessage(msj) {
        try {
            this.message.push(msj);
            fs.writeFileSync("./message.txt", JSON.stringify(this.message, null, "\t"));
        } catch (err) {
            return err;
        }
    }

}

module.exports = new Message();