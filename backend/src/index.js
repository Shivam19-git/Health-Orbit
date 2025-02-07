const express = require('express')
const dotenv = require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const authRoute = require('./routes/autRoute')
const userRoutes = require('./routes/userRoute')

dbConnect()
const app = express()

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})