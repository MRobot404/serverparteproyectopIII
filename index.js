const { clear } = require("console");

console.log("Hello Friend");
const app = require("express")();
const serverHttp = require("http").Server(app);
const io = require("socket.io")(serverHttp, {
  cors: {
    origin: "*",
  },
});

// en esta constante vamos a guardar todos nuestros mensajes
const myMessages = [];
const myUsers = [];
const myUsersleft = [];
const myTyping = [];

//recepcion de conexiones o mensajes
io.on("connection", function (socket) {
  socket.on("conectado", function (data) {
    myUsers.push(data);
    console.log(myUsers); // guarda el dato en la variable myUsers
    //emitir el texto que se ingreso.
    socket.emit("usuariosc", myUsers);
    //Se envia broadcast a todos los usuarios
    io.emit("usuariosc", myUsers);
  });
  socket.on("send-message", function (data) {
    myMessages.push(data);
    console.log(data); // guarda el mensaje a la variable mymessages

    //emitir el texto que se ingreso.
    socket.emit("text-event", myMessages);
    //Se envia broadcast a todos los usuarios
    io.emit("text-event", myMessages);
    myTyping.splice(0, 1);
  });

  socket.on("desconectado", function (data) {
    myUsersleft.push(data);
    console.log("Desconectado");
    socket.emit("usuariosd", myUsersleft);
    //Se envia broadcast a todos los usuarios
    io.emit("usuariosd", myUsersleft);
  });
  socket.on("typing", function (data) {
    myTyping.push(data.id);
    socket.emit("escribiendo", myTyping);
    io.emit("escribiendo", myTyping);
    myTyping.splice(0, 1);
  });
});

//levantar servidor http
serverHttp.listen(3000, () => {
  console.log(`server running  port  ${3000}`);
});
