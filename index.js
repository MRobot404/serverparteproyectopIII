console.log("Grupo 3");

const app = require("express")();
const serverHttp = require("http").Server(app);
const io = require("socket.io")(serverHttp, {
  cors: {
    origin: "*",
  },
});

// en esta constante vamos a guardar todos nuestros mensajes
const myMessages = [];

//recepcion de conexiones o mensajes
io.on("connection", function (socket) {
  socket.on('conectado', function (id){
    console.log(id)
  })
  socket.on("send-message", function (data) {
    myMessages.push(data); 
    console.log(data)// guarda el mensaje a la variable mymessages

    //emitir el texto que se ingreso.
    socket.emit("text-event", myMessages);

    //Se envia broadcast a todos los usuarios
    io.emit("text-event", myMessages);
  });

});

//levantar servidor http
serverHttp.listen(3000, () => {
  console.log(`server running  port  ${3000}`);
});
