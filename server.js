const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Irec-backend radi..." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/yard.routes")(app);
require("./routes/recycling.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8079;
app.listen(PORT, () => {
  console.log("Poslužitelj je pokrenut na portu " + PORT +"!");
});

const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log("Drop and Resync Db");
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "consumer"
  });
 
  Role.create({
    id: 2,
    name: "recycler"
  });
}