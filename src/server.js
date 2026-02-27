import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js"
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.get('/', (req, res) => {
  res.render('chatClient');
});

 const httpServer = app.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});

const socketServer = new Server(httpServer);

let messages = [];

socketServer.on('connection', (client) => {
  
  client.on("newUser", (userName) => {
    client.broadcast.emit("newUser", userName)
  })

  client.on("newMessage", (message) => {
    messages.push(message)
    socketServer.emit("newMessage", messages)
  });
})

