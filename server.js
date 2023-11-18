const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
var cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./client/build")));

require("./connection");
const auth = require("./routes/auth");
app.use(auth);
const catAuth = require("./routes/CategoryAuth");
app.use(catAuth);
const prodAuth = require("./routes/productAuth");
app.use(prodAuth);
const orderAuth = require("./routes/orderAuth");
app.use(orderAuth);

app.get('*',function (req, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"),
              function(err){
                res.status(500).send(err);
              }
    );
})
// "start": "node server.js",
// "server": "nodemon server.js",
// "client": "npm start --prefix ./client",
// "dev": "concurrently \"npm run start\" \"npm run client\""

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
