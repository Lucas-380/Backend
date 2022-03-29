const config = require('../utils/config')
const mongoose = require('mongoose')
const { schema, normalize } = require('normalizr')

const path = config.mongodb.path;
mongoose.connect(path)

class Modelo {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
    }
    async insertArticle(data) {
        try {
            const insert =await this.collection.create(data);
            return insert
        } catch (err) {
            console.log(err);
        }   
    }
    async listTable() {
        try {
            const list = await this.collection.find();
            const data = {
                id: 'mensajes',
                mensajes: list
            }
            const author = new schema.Entity("author", {}, { idAttribute: "email" });
            const post = new schema.Entity("post", { author: author }, { idAttribute: "id" });
            const posts = new schema.Entity("posts", { posts: [post] }, { idAttribute: "id" });

            const normalizedData = normalize(data, posts);
            return normalizedData
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Modelo