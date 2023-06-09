const express = require("express")
const router = express.Router()
const {authMidWare, authorizePermissions} = require("../middleware/authMiddleware")
const{createFav} = require("../controller/Fav.controller")



router.route("/")
.post(authMidWare, createFav)


// router.route("/:id")
// .delete(authMidWare, deleteFav)



module.exports = router