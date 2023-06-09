const Products = require("../models/Product")
const {StatusCodes}= require("http-status-codes")
const customApiError =  require("../errors")
const{checkPermission}= require("../utils")


const createProduct = async(req, res)=>{
    req.body.user = req.user.userId;
    const product = await Products.create(req.body)
    res.status(StatusCodes.CREATED).json({product: product})
}

const getAllProducts = async(req, res)=>{
    const product = await Products.find({})
    res.status(StatusCodes.OK).json({product: product, count: product.length })
}

const getProduct = async(req, res)=>{
    const { id: productId } = req.params;
    const product = await Products.findOne({_id:productId})

    if (!product) {
        throw new customApiError.notFound(`No product with id : ${productId}`);
      }
    
    res.status(StatusCodes.OK).json({product: product})
}

const getProductsbySeller = async(req, res)=>{
    const product = await Products.find({user:req.user.userId}).populate("interests")
    if (!product) {
        throw new customApiError.notFound(`No product by user : ${req.user.userId}`);
      }
    res.status(StatusCodes.OK).json({product: product})
}

const updateProduct = async(req, res)=>{
    const { id: productId } = req.params;
    const checkProduct = await Products.findOne({_id:productId})
    if (!checkProduct) {
        throw new customApiError.notFound(`No product with id : ${productId}`);
      }
    checkPermission(req.user, checkProduct.user)
    const product = await Products.findOneAndUpdate({_id:productId}, req.body, {
        new:true,
        runValidators:true
    })
    res.status(StatusCodes.OK).json({product: product})
}

const deleteProduct = async(req, res)=>{
    const { id: productId } = req.params;
    const checkProduct = await Products.findOne({_id:productId})
    if (!checkProduct) {
        throw new customApiError.notFound(`No product with id : ${productId}`);
    }
    checkPermission(req.user, checkProduct.user)
    const product = await Products.findOneAndDelete({_id:productId})

    res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' })
}



module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    getProductsbySeller,
    updateProduct,
    deleteProduct,
    // uploadImage
}