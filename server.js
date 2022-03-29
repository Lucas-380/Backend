const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const messageDao = require('./src/daos/index');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const config = require('./src/utils/config')


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(session({
    store: MongoStore.create({mongoUrl: config.mongodb.path, mongoOptions: advancedOptions}),
    secret: 'shhhhhhhhh',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

io.on("connection", async (socket) => {
    console.log("Usuario conectado con id: " + socket.id);

    socket.emit("messages", await messageDao.listTable());
    console.log(await messageDao.listTable());
    socket.on("new-message", async (message) => {
        await messageDao.insertArticle(message, "messages");
        socket.emit("messages", await messageDao.listTable());
    });
});

function auth(req, res, next) {
    if (req.session?.user) {
        next();
    } else {
        res.redirect('/login')
    }
}
//Endpoints
app.get('/', (req, res) => {
    res.redirect('/login')
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/view/login.html");
});

app.get('/home', (req, res) => {
    res.render(__dirname + '/view/index.ejs', {
        name: req.session.user
    });
});

app.post('/login', (req, res) => {
    req.session.user = req.body.name;
    res.redirect('/home');
});

app.get('/logout', auth, (req, res) => {
    res.render(__dirname + '/view/logout.ejs', {
        name: req.session.user
    });
    req.session.destroy();
});


const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => {
    console.log(error);
});