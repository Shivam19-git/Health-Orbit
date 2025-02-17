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
app.use(cors())
app.use(express.json())


app.use('/api/auth/user', authRoute)
app.use('/api/admin', adminRoutes)
app.use('/api/coach', coachRoutes)



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})