import { Router } from "express"
import binaryModel from "./db.js"

const router = Router()

router.get("/", (req, res) => {
    binaryModel.find({}).then(users => {
        res.render("index", { users })
    })

})

router.post("/add-member", (req, res) => {
    const { platform, username, userid, email, flag, sig } = req.body
    binaryModel.create({ platform, username, userid, email, flag, sig })
        .then(user => res.redirect("/"))
})

router.post("/delete-member", (req, res) => {
    const { id } = req.body
    binaryModel.findOneAndDelete({ _id: id })
        .then(user => res.redirect("/"))
})

router.post("/update-member", (req, res) => {
    const { username, userid, email, flag, sig, id, platform } = req.body
    binaryModel.findOneAndUpdate({ _id: id }, { platform, username, userid, email, flag, sig })
        .then(user => res.redirect("/"))
})

router.get("/all", (req, res) => {
    var { sig, type } = req.query
    binaryModel.find({ sig }).then(user => {
        var user__type = user[0].platform.slice(2);
        if (user__type.includes(type)) {
            res.json(user)
        }
        else {
            res.json("")
        }
    })
})

export default router