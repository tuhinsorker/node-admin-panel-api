function checkRole(role){
    return (req, res, next)=>{
        if(req.user.role !== role){
            return res.status(403).json(
                {
                    status : false,
                    message:'Access denied'
                }
            )
        }
        next();
    }
}
module.exports = checkRole;
