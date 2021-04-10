const express = require("express");
const htmlRoutes = require("./routes/htmlRoute.js");
const apiRoutes = require("./routes/apiRoute.js");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"));

require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

app.listen(PORT,()=> console.log(`Listening on PORT : ${PORT}`));