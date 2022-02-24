const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const http = require("http").Server(app);
const productos = require("./api/productClass");
const mensajes = require("./api/message");

const io = require("socket.io")(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//-----------------Handlebars-----------------
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs"
  })
);

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

io.on("connection", async socket => {
  console.log("Nuevo cliente conectado!");

  socket.emit("productos", await productos.getAll());
  socket.emit("showMessages", await mensajes.readMessage());

  //-----------------Chat-----------------
  socket.on("newMessage", async mensaje => {
    await mensajes.saveMessage(mensaje);
    io.sockets.emit("showMessages", await mensajes.readMessage());
  });

  socket.on("update", data => {
    io.sockets.emit("productos", productos.getAll());
  });
});


app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send("Ocurrio algún error");
});

//-----------------Routes-----------------
const router = require("./routes");
app.use("/api", router);


const PORT = process.env.PORT || 8080;

const server = http.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on("error", error => {
  console.log("error en el servidor:", error);
});
