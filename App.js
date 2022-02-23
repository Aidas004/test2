const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()

const whitelist = ['http://localhost:3000', 'http://example2.com'];
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if(whitelist.includes(origin))
            return callback(null, true)

        callback(new Error('Not allowed by CORS'));
    }
}


app.use(cors(corsOptions))
app.use(express.json())
app.listen(4000)

app.use(session({
    secret: 'asdasd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

mongoose.connect(process.env.MONGO_KEY)
    .then (res=> {
        console.log("logged in to db successful")
    }).catch(e => {
    console.log(e)
})


const router = require("./Routes/main2")
app.use("/", router)





// const user = {
//     name: "Aidas",
//     pass: "123"
// }
// app.get('/login/:name/:password', (req, res) => {
//     const {name, password} = req.params
//     if (name === user.name && password === user.pass) {
//         req.session.user = user
//         return res.send({success: true})
//     } else {
//         return res.send({success: false})
//     }
// })
// app.post('/login', (req, res) => {
//     const {name, pass} = req.body
//     if (name === user.name && pass === user.pass) {
//         req.session.user = user
//         return res.send({success: true})
//     } else {
//         return res.send({success: false})
//     }
//
// })
//
// app.get('/upload', (req, res) => {
//     if (req.session.user) {
//         console.log(req.session.user)
//         res.send(req.session.user)
//     } else {
//         res.send({success: false})
//     }
// })
//
// app.get('/info', (req, res) => {
//     console.log('asdasd')
//     res.send({message: "ok"})
//     req.session.name = 'aidas'
// })
// app.get('/show', (req, res) => {
//     console.log('asdasd')
//     res.send({message: "ok"})
//     console.log(req.session.name)
// })