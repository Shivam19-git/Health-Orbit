const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log(`MongoDB connected: ${connect.connection.host} , ${connect.connection.name}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnect