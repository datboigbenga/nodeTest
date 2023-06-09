const express = require("express")
const router = express.Router()
const {authMidWare, authorizePermissions} = require("../middleware/authMiddleware")
const{createProduct, getAllProducts, getProduct, updateProduct, deleteProduct} = require("../controller/Product.Controller")



router.route("/")
.get(getAllProducts)
.post(authMidWare, authorizePermissions("seller"), createProduct)


router.route("/:id")
.get(getProduct)
.patch(authMidWare, authorizePermissions("seller"), updateProduct)
.delete(authMidWare, deleteProduct)

module.exports = router