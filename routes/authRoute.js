const express = require("express")
const router = express.Router()
const{register, login} = require("../controller/Auth.controller")
const rateLimiter = require('express-rate-limit');



router.post("/register", register)
router.post("/login",  login)


module.exports = router