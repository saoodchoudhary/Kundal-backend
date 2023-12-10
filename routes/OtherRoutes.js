const express = require('express')
const uuid = require('uuid');
const PurchaseModel = require('../model/PurchaseOrder');
const AddProductModel = require('../model/AddProductModel');
const router = express.Router();


router.post('/orderconfirm',async (req, res) => {
  const d = new Date();
  const date = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const fullDate = `${date}-${month}-${year}`

  const generateOrderID = () => {
    const uniqueID = uuid.v4().slice(0, 5); // Generate a random 12-character UUID
    const timestamp = new Date().getTime().toString();// Extract hhmmssms
    const orderID = `OD${uniqueID}${timestamp}`; // Combine both IDs
    return orderID;
  };
  const { item, userDetails } = req.body;
  for (const val of item) {
    const product = await AddProductModel.findById({ _id: val.itemId });

    if (product) {
      const updatedStock = product.stock - Number(val.quantity);

      await AddProductModel.findByIdAndUpdate({ _id: val.itemId }, { stock: updatedStock });

      console.log('Stock updated successfully');
    } else {
      console.log('Product not found');
    }
    if(val.price === "free"){
      PurchaseModel.create({
        orderID: generateOrderID(),
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        address: userDetails.address,
        zipCode: userDetails.zipCode,
        city: userDetails.city,
        state: userDetails.state,
        country: userDetails.country,
        phone: userDetails.phone,
        email: userDetails.email,
        productName: val.productName,
        itemId: val.itemId,
        price: val.price,
        date:fullDate,
        status:"order",
        quantity: val.quantity,
        weight: val.weight,
        oldPrice: val.oldPrice,
        unit: val.unit,
        productId: val.productId,
        image: val.image,
        discountPrice: val.discountPrice,
        ipAddress: req.ip || req.connection.remoteAddress
        // Other item details
      });
    }else{
 PurchaseModel.create({
      orderID: generateOrderID(),
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      address: userDetails.address,
      zipCode: userDetails.zipCode,
      city: userDetails.city,
      state: userDetails.state,
      country: userDetails.country,
      phone: userDetails.phone,
      email: userDetails.email,
      productName: val.productName,
      itemId: val.itemId,
      price: val.price,
      date:fullDate,
      status:"order",
      quantity: val.quantity,
      weight: val.weight,
      oldPrice: val.oldPrice,
      unit: val.unit,
      productId: val.productId,
      image: val.image,
      discountPrice: val.discountPrice,
      // Other item details
    });
    }
   
  };
  res.json("sucess")
})
router.get('/admin/getAllOrder',async (req, res) => {
 const getAllOrder =await PurchaseModel.find({});
  res.json(getAllOrder)
})


router.post('/getEmailPhonePurchasedCount',async (req, res) => {
 const {email, phone} = req.body;
const emailItem = await PurchaseModel.find({email: email});
const phoneItem = await PurchaseModel.find({phone: phone})
res.json({
  phone:phoneItem.length,
  email:emailItem.length
})
});

module.exports = router