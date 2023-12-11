const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema({
    orderID:String,
    itemId:String,
    firstName:String,
    lastName:String,
    area:String,
    jada:String,
    street:String,
    block:String,
    houseNumber:String,
    phone:String,
    email:String,
    brand:String,
    productId:String,
    productName: String,
    description: String,
    price: String,
    quantity: String,
    oldPrice: String,
    image: String,
    unit: String,
    tag: String,
    weight: String,
    discountPrice: String,
    date:String,
    status:String,
    stock: String,
    ipAddress:String

})
const PurchaseModel = mongoose.model('purchaseorder', purchaseSchema);

module.exports = PurchaseModel