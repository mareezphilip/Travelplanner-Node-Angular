require("dotenv").config()

require("./database/connection")

const app = require("./TravelAPP/src")

app.listen(process.env.port, ()=> console.log(process.env.appURL))