const Favourite = require("../models/Favourites")
const {StatusCodes}= require("http-status-codes")
const customApiError =  require("../errors")
const{checkPermission}= require("../utils")
const Product = require("../models/Product")


const createFav = async(req, res)=>{
    const {product:productId} = req.body
    const isValidProduct = await Product.findOne({_id:productId})

    if(!isValidProduct){
      throw new customApiError.notFound(`No product with id: ${productId}`)
    }
    const alreadySubmitted = await Favourite.findOne({
      product: productId,
      user: req.user.userId
    })
  
    if(alreadySubmitted){
      throw new customApiError.BadRequestError(`Already submitted an interest for product`)
    }
    req.body.user = req.user.userId;
    const fav = await Favourite.create(req.body)
    res.status(StatusCodes.CREATED).json({favourite: fav})
}

// const deleteFav = async(req, res)=>{
//   const {id:FavId} = req.params
//   const fav = await Favourite.findOne({_id:FavId})
//   if (!fav) {
//       throw new customApiError.notFound(`No favourite product with id : ${FavId}`);
//     }

//   checkPermission(req.user, fav.user)

//   await fav.remove
  
//   res.status(StatusCodes.OK).json({ msg:`Deleted interest in product`})
// }
module.exports= {
  createFav,
  // deleteFav
}