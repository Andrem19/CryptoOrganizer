const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(require("cors")());

//Bring in the routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/room"));
app.use('/position', require('./routes/position'))
app.use('/apikeys', require('./routes/api.routes'))

//images------------------
app.use('/image', require('./routes/image'))
app.use('/predict', require('./routes/predict'))
//--------------

//Error Handlers
const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEV") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;