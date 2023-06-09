const {unauthenticated, unaccessible}= require("../errors")
const {StatusCodes} = require("http-status-codes")
const jwt = require("jsonwebtoken")
const {isTokenValid}= require("../utils")


const authMidWare = (req, res, next)=>{

 const auth = req.headers.authorization

 if(!auth || !auth.startsWith("Bearer ")){
    throw new unauthenticated("You are not authorized to access route")
 }

 const token = auth.split(' ')[1]
//  console.log(token)
 try {
    const decoded = isTokenValid(token)
   req.user = decoded.tokenUser
    next()
 } catch (error) {
   // console.log(error)
   throw new unauthenticated("Authorization invalid")
    
 }

}

const authorizePermissions = (...roles)=>{
   return(req, res, next)=>{
      if(!roles.includes(req.user.role)){
          throw new unaccessible("unable to access route")
      }
      next();
   }
}

module.exports = {
   authMidWare,
   authorizePermissions
}