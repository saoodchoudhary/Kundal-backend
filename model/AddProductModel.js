const mongoose = require("mongoose")

const AddProductSchema = new mongoose.Schema({
    category:String,
    brand:String,
    fragrance:String,
    ingredients:String,
    title: String,
    description: String,
    price: String,
    image: String,
    unit: String,
    tag: String,
    weight: String,
    discountPrice: String,
    stock: String
})
const AddProductModel = mongoose.model('product', AddProductSchema);

module.exports = AddProductModel