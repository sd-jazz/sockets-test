const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const app = express();
const ac = require("./controllers/authController");
const uc = require("./controllers/userController")

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
app.get("/api/getUsers/:user", uc.getUsers)

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Ready to rollout on PORT ${PORT}!`);
});
