const authorizeRole = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message : "Forbidden"})
        }
        next()
    }
}

const authorizeSuperAdmin = (req,res,next) => {
    if(req.user.role !== 'superadmin'){
        return res.status(403).json({message : "Forbidden"})
    }
    next()
}

module.exports = {authorizeRole, authorizeSuperAdmin}