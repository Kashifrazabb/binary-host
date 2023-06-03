import mongoose from "mongoose"

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', _ => console.log("Database is synced"))
mongoose.connection.on('error', _ => console.log("Database error"))

const { Schema, model } = mongoose

const binarySchema = Schema({
    platform: { type: String },
    username: { type: String },
    userid: { type: String },
    email: { type: String },
    flag: { type: String },
    sig: { type: String }
})

const binaryModel = model('binaryModel', binarySchema)

export default binaryModel