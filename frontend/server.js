const express = require("express");
const port = process.env.FRONTEND_PORT || 3000;
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const htmlRoutes = require("./controller/html-routes.js");
app.use("/", htmlRoutes);

app.listen(port, function() {
    console.log("Frontend app listening on port " + port);
});