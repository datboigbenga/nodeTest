const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:[true, "Please provide product name"],
        maxlength:[100, 'Name cannot be more than 100 characters']
    },
    price:{
        type: Number,
        required:[true, "Please provide product price"],
        default:0,
    },
    description:{
        type: String,
        required:[true, "Please provide product description"],
        maxlength:[1000, "Description can not be more than 1000 characters"]
    },
    freeShipping:{
        type:Boolean,
        default:false
    },
    // numOfFavs: {
    //     type: Number,
    //     default: 0,
    //   },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    }   
},
{timestamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true}}
);

ProductSchema.virtual('interests', {
    ref: 'Favs',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
  });
  
  
// ProductSchema.post("findOneAndDelete", { document: true }, async function(next){
//     console.log(this._id)
//     await this.model("Favs").deleteMany({product:this._id})
//     console.log(this._id)
// })


module.exports = mongoose.model("Products", ProductSchema)