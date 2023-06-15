import { Router } from "express"
import binaryModel from "./db.js"

const router = Router()

router.get("/", (req, res) => {
    binaryModel.find({}).then(users => {
        res.render("index", { users })
    })

})

router.post("/add-member", (req, res) => {
    const { platform, username, userid, email, flag, sig_m, sig_p } = req.body
    binaryModel
        .create({ platform, username, userid, email, flag, sig_m, sig_p })
        .then(_ => res.redirect("/"))
})

router.post("/delete-member", (req, res) => {
    const { id } = req.body
    binaryModel.findOneAndDelete({ _id: id })
        .then(_ => res.redirect("/"))
})

router.post("/update-member", (req, res) => {
    const { username, userid, email, flag, sig_m, sig_p, id, platform } = req.body
    binaryModel
        .findOneAndUpdate({ _id: id }, { platform, username, userid, email, flag, sig_m, sig_p })
        .then(_ => res.redirect("/"))
})

router.get("/all", (req, res) => {
    var { sig, type, isMobile } = req.query
    if (Boolean(!isMobile)) { //If mobile
        binaryModel.find({ sig_m: sig }).then(user => {
            var user__type = user[0].platform.slice(2);
            if (user__type.includes(type)) {
                res.json(user)
            }
            else {
                res.json("")
            }
        })
    }
    else {
        binaryModel.find({ sig_p: sig }).then(user => {
            var user__type = user[0].platform.slice(2);
            if (user__type.includes(type)) {
                res.json(user)
            }
            else {
                res.json("")
            }
        })
    }
})

export default router