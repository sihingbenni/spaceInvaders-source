const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.BACKEND_PORT || 8080;
const app = express();
const db = require('./models');
const cors = require('cors');

// Enable CORS for the frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL
}));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Import routes and give the server access to them.
const apiRoutes = require("./controller/api-routes.js");
app.use("/api", apiRoutes);

db.sequelize.sync({force: false}).then(function(){
  app.listen(port, function() {
    console.log("App listening on port " + port);
  });
});