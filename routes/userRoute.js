const express = require("express")
const router = express.Router()
const {authMidWare, authorizePermissions} = require("../middleware/authMiddleware")
const{getProductsbySeller} = require("../controller/Product.Controller")



router.route("/products")
.get(authMidWare, getProductsbySeller)

module.exports = router