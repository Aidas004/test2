const bcrypt = require("bcrypt");
const users = require("../models/userSchema")


module.exports = {
    register: async (req, res) => {
        const { email, password1, admin } = req.body
        const hash = await bcrypt.hash(password1, 10)
        const userExists = await users.findOne({email: email})
        if (userExists) {
            res.send({message: "email taken"})
        } else {
            const user = new users()
            user.email = email
            user.admin = admin
            user.password = hash
            user.money = 100

            user.save().then(res => {
                console.log("user registered successful")
            })
            res.send({message: "user registered successful", user})
        }


    },
    login: async (req, res) => {
        const { email, password } = req.body
        const find = await users.findOne({email: email})
        const match = await bcrypt.compare(password,  find.password);
        if (match) {
            res.send(find)
            console.log(find)
        } else {
            res.send({message: "wrong password"})}
    },
    getAll: async (req, res) => {
        const {manage} = req.body
        const sent = await users.find({manage})
        res.send(sent)
    },
    update: async (req, res) => {
        const user = req.body
        const update = await users.findOneAndUpdate({email: user.email}, {money: user.money, admin: user.admin})
        const find = await users.findOne({email: user.email})
        console.log(update)
        res.send(find)
    }
}