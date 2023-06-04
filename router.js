import { Router } from "express"
import binaryModel from "./db.js"

const router = Router()

router.get("/", (req, res) => {
    binaryModel.find({}).then(users => {
        res.render("index", { users })
    })

})

router.post("/add-member", (req, res) => {
    const { platform, username, userid, email, flag, sig, mop } = req.body
    binaryModel.create({ platform, username, userid, email, flag, sig, mop })
        .then(user => res.redirect("/"))
})

router.post("/delete-member", (req, res) => {
    const { id } = req.body
    binaryModel.findOneAndDelete({ _id: id })
        .then(user => res.redirect("/"))
})

router.post("/update-member", (req, res) => {
    const { username, userid, email, flag, sig, id } = req.body
    binaryModel.findOneAndUpdate({ _id: id }, { username, userid, email, flag, sig, mop })
        .then(user => res.redirect("/"))
})

router.get("/all", (req, res) => {
    var { platform, sig } = req.query
    binaryModel.find({ sig, platform }).then(user => {
        res.json(user)
    })
})

export default router