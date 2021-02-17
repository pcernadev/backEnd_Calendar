const express = require("express");
const dbConnection = require("./database/config");
const cors = require("cors");
require("dotenv").config();

//console.log(process.env);

//crea el servidor
const app = express();

//DB
dbConnection();

//cors
app.use(cors());

//directorio Publico
app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//rutas

//escuchar
app.listen(process.env.PORT, () => {
  console.log(`Running Server ${process.env.PORT}`);
});
