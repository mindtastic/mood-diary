const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes")(app);

db.sequelize.authenticate().then(() => console.log("\x1b[32m", "Successfully authenticated to PostgreSQL", "\x1b[0m"));
db.sequelize.sync({ force: true }).then(() => console.log("\x1b[32m", "Successfully synchronized database model.", "\x1b[0m"))

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);

});