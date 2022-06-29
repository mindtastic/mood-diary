var express = require('express');
var app = express();
const db = require('./db');

require("./routes")(app)
app.use(express.json());

db.sequelize.authenticate().then(() => console.log("\x1b[32m", "Successfully authenticated to PostgreSQL", "\x1b[0m"));
db.sequelize.sync({ force: true }).then(() => console.log("\x1b[32m", "Successfully synchronized database model.", "\x1b[0m"))

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);

});