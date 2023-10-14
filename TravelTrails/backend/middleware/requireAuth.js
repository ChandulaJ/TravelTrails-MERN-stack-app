const jwt = require("jsonwebtoken")
const Account = require("../models/accountModel")

const requireAuth = async (req, res, next) => {
    //verify authentication
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: "Auth token required"})
    }

    const token = authorization.split(" ")[1]

    try {
        const{_id} = jwt.verify(token, process.env.SECRET)
        req.accounts = await Account.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth 