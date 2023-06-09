const mongoose = require("mongoose")


const FavSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required: true,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Products",
        required: true,
    }
},
{timestamps:true}

);

FavSchema.index({product:1, user:1}, {unique:true});

// FavSchema.static.calculateFavs = async function(productId){
//     const result =  [
//         {
//           $match: {
//             'product': productId
//           }
//         }, {
//           $group: {
//             _id: null,
//             numOfFavs: {
//               $sum: 1
//             }
//           }
//         }
//       ];

//       try {
//        await this.model("Products").findOneAndUpdate(
//         {   _id: productId },
//         {
//             numOfFavs: result[0]?.numOfFavs || 0
//         }
//        )
//       } catch (error) {
//         console.log(error)
//       }
// }

// FavSchema.post("save", async function(){
//  await this.constructor.calculateFavs(this.product)
// })


// FavSchema.post("remove", async function(){
//     await this.constructor.calculateFavs(this.product)
// })



module.exports = mongoose.model("Favs", FavSchema)