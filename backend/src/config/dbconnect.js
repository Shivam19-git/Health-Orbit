const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt') 
const Admin = require('../models/adminModel')

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log(`MongoDB connected: ${connect.connection.host} , ${connect.connection.name}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const createAdminIfNotExists = async () => {
    try {
        const admin = await Admin.findOne({ role: 'admin' })
        if (!admin) {
            const username = 'admin'
            const password = 'admin123'
            const hashedPassword = await bcrypt.hash(password, 10)
        
            const newAdmin = new Admin({
                username: username,
                password: hashedPassword
            })
        
            await newAdmin.save()
            console.log('Admin user created')
        } else {
            console.log('Admin user already exists')
        }
    } catch (error) {
        console.log('Error creating admin user:', error)
    }
}

createAdminIfNotExists()

module.exports = dbConnect