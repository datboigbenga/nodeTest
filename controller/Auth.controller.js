const User = require("../models/User")
const {StatusCodes} = require("http-status-codes")
const {createTokenUser,createJWT, isTokenValid} = require("../utils")
const customApiError= require("../errors")
const crypto =require("crypto")

const register= async(req, res)=>{

    const {name, email, password, role} = req.body
    const emailAlreadyExists = await User.findOne({email})

    if(emailAlreadyExists){
        throw new customApiError.BadRequestError("Email already exist")
    }
    
    const user = await User.create({name, email, password, role});
    const tokenUser = createTokenUser(user)
    res.status(StatusCodes.CREATED).json({msg: "Successfully created, please verify your email", tokenUser})
}
 
const login= async(req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
        throw new customApiError.BadRequestError("Please fill in the fields")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new customApiError.unauthenticated("User does not exist")
    }

    const isPasswordCorrect = await user.comparePass(password)

    if(!isPasswordCorrect){
        throw new customApiError.unauthenticated("invalid details")
    }

    const tokenUser = createTokenUser(user)

    const token = createJWT({payload: {tokenUser}})
    res.status(StatusCodes.OK).json({msg:"logged in successfully",user:tokenUser.name, token})
 }


 module.exports = {
    register,
    login,
}
