const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())
app.listen(1111)

const router = require("./Routes/main")
app.use("/", router)