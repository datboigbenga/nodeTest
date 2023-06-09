// express
const express = require("express")
const app = express()

// security packages
const rateLimiter = require("express-rate-limit")
const cors = require("cors")
const helmet = require("helmet")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")

// // otherpackages
// const cookiePaser = require("cookie-parser")

// router
const Authroute  = require("../routes/authRoute")
const Productroute = require("../routes/ProductRoute")
const Userroute = require("../routes/userRoute")
const Favroute = require("../routes/favRoute")

// middleware
const notFound = require("../middleware/notFound")
const errorHandler = require("../middleware/errorHandler")



app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('./public'));


app.use("/api/v1/auth", Authroute)
app.use("/api/v1/products", Productroute)
app.use("/api/v1/user", Userroute)
app.use("/api/v1/favourite", Favroute)


app.use(notFound)
app.use(errorHandler)

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);


app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

module.exports = app;
