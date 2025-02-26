const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const dbConnect = require('./config/dbconnect')
const authRoute = require('./routes/autRoute')
const userRoutes = require('./routes/userRoute')
const adminRoutes = require('./routes/adminRoute')
const coachRoutes = require('./routes/coachRoutes')


dbConnect()

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())


app.use('/api/auth/user', authRoute)
app.use('/api/coach', coachRoutes)
app.use('/api/admin', adminRoutes)



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})