const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    let token
    let authHeader = req.headers.authorization || req.headers.Authorization
    
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]
    }
    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log("Decoded user", decoded)
        next()

    } catch (error) {
        console.error(error)
        return res.status(401).json({message : "Unauthorized"})
    }


}

module.exports = verifyToken