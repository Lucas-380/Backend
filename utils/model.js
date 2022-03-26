const config = require("../utils/config");
const mongoose = require("mongoose");
const { schema, normalize, denormalize } = require("normalizr");
const util = require("util");

const URL = config.mongodb.path;

mongoose.connect(URL)

module.exports = class Modelo {

    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
    }

    async insertarArticulo(data) {
        try {
            const insert = await this.collection.create(data);
            return insert;
        }
        catch (error) {
            console.log(error);
        }
    }

    async listarTabla() {
        try {
            const list = await this.collection.find({});
            const data = {
                id: 'mensajes',
                mensajes: list
            }

            const author = new schema.Entity("author");
            const post = new schema.Entity("post", {author: author}, {idAttribute:"_id"});
            const posts = new schema.Entity("posts", { posts: [post] });


            const normalizedData = normalize(data, posts);

            return normalizedData
        }

        catch (error) {
            console.log(error);
        }
    }

}