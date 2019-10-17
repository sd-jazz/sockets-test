const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const socket = require("socket.io");
const app = express();
const ac = require("./controllers/authController");
const uc = require("./controllers/userController");

require("dotenv").config();

app.use(bodyParser.json());

app.use(
  session({
    secret: "mega hyper ultra secret",
    saveUninitialized: false,
    resave: false
  })
);

massive(process.env.CONNETION_STRING).then(db => {
  console.log("Connected to DB");
  app.set("db", db);
});
// .catch(err => console.log(err));

app.use(express.static(`${__dirname}/../build`));

// GET
app.get("/api/userData", ac.getUserData);
app.get("/auth/callback", ac.login);
app.get("/api/logout", ac.logout);
app.get("/api/session_info", ac.sessionInfo);
app.get("/api/getUsers/:user", uc.getUsers);
app.get("/api/getRoomName/:user1/:user2", uc.getRoomName)
app.get("/api/getMessages/:room", uc.getMessages)

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const PORT = process.env.SERVER_PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Ready to rollout on PORT ${PORT}!`);
});

const io = socket(server);

io.on("connection", socket => {
  socket.on("CONNECT_USERS", async data => {
    const db = app.get("db");
    const { user1_id, user2_id } = data;
    db.checkRooms([user1_id, user2_id]).then(response => {
      if(response.length === 0) {
        const roomName = `${user1_id} + ${user2_id}`;
        db.createRoom([user1_id, user2_id, roomName]);
      }
    })
  })

  socket.on("SEND_MESSAGE", message => {
    console.log("ADDING MESSAGE")
    io.in(message.room).emit("SEND_MESSAGE", {
      message: message.newMessage,
      sender: message.sender
    }) 
    app.get("db").createMessage([
      message.sender,
      message.recipient,      
      message.room,
      message.newMessage
    ])
  })

  socket.on("JOIN_ROOM", room => {
    console.log("ROOM =", room)
    socket.join(room.room.room_name)
    console.log(`USER HAS JOINED ${room.room.room_name}`)
  })

  socket.on("LEAVE_ROOM", room => {
    socket.leave(room.room.room_name)
    console.log(`USER HAS LEFT ${room.room.room_name}`)
  })
})
