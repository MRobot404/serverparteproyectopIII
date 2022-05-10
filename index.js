console.log("MR Robot");

const app = require("express")();
const serverHttp = require("http").Server(app);
const io = require("socket.io")(serverHttp);

const myMessages = [];

io.on("connection", function (socket) {
  socket.on("send-message", function (data) {
    myMessages.push(data);
    socket.emit("text-event", myMessages);
    socket.brodcast.emit("text-event", myMessages);
  });
});

serverHttp.listen(3000, () =>{
    console.log(`server running on port  ${3000}`);
})