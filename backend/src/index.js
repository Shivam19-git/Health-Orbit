const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const dbConnect = require('./config/dbconnect')
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const adminRoutes = require('./routes/adminRoute')
const coachRoutes = require('./routes/coachRoutes')
const dietRoutes = require('./routes/dietRoutes')


dbConnect()

const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/auth/user', authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/coach', coachRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/diet',dietRoutes)




const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})