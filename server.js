const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
const config = require("./utils/config");
const Modelo = require("./utils/model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const messages = new Modelo("messages", {
    author: {
        id: String,
        name: String,
        surname: String,
        age: Number,
        alias: String,
        avatar: String
    },
    text: String,
    date: String
}, { versionKey: false });

io.on("connection", async (socket) => {
    console.log("Usuario conectado con id: " + socket.id);

    socket.emit("messages", await messages.listarTabla());
    console.log(await messages.listarTabla());
    socket.on("new-message", async (message) => {

        await messages.insertarArticulo(message, "messages");
        socket.emit("messages", await messages.listarTabla());
    });
});

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => {
    console.log(error);
});