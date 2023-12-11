const express = require('express')
const uuid = require('uuid');
const PurchaseModel = require('../model/PurchaseOrder');
const AddProductModel = require('../model/AddProductModel');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/orderconfirm', async (req, res) => {



  const { item, userDetails } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "kundal.net.com@gmail.com",
      pass: "vtvvwiuqjmltqqgo"
    },
  });



  // const mailOptions = await transporter.sendMail({
  //   from: {
  //     name: "Kundal",
  //     address: "kundal.net.com@gmail.com"
  //   }, // sender address
  //   to: [userDetails.email, "worldm957@gmail.com"], // list of receivers
  //   subject: "Order Confirm", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // }).then((r) => {
  //   res.json({
  //     success: true
  //   })
  // })





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


  for (const val of item) {
    const product = await AddProductModel.findById({ _id: val.itemId });

    if (product) {
      const updatedStock = product.stock - Number(val.quantity);

      await AddProductModel.findByIdAndUpdate({ _id: val.itemId }, { stock: updatedStock });

      console.log('Stock updated successfully');
    } else {
      console.log('Product not found');
    }
    
    if (val.price === "free") {
      PurchaseModel.create({
        orderID: generateOrderID(),
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        area: userDetails.area,
        block: userDetails.block,
        jada: userDetails.jada,
        street: userDetails.street,
        houseNumber: userDetails.houseNumber,
        phone: userDetails.phone,
        email: userDetails.email,
        productName: val.productName,
        itemId: val.itemId,
        price: val.price,
        date: fullDate,
        status: "order",
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
    } else {
      PurchaseModel.create({
        orderID: generateOrderID(),
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        area: userDetails.area,
        block: userDetails.block,
        jada: userDetails.jada,
        street: userDetails.street,
        houseNumber: userDetails.houseNumber,
        phone: userDetails.phone,
        email: userDetails.email,
        productName: val.productName,
        itemId: val.itemId,
        price: val.price,
        date: fullDate,
        status: "order",
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

  let itemsHTML = ''; // Initialize an empty string to store HTML

  for (const val of item) {
    itemsHTML += `
      <tr>
        <td>${val.productName}</td>
        <td>${val.price}</td>
        <td>${val.quantity}</td>
      </tr>
    `;
  }
  const mailOptions = await transporter.sendMail({
    from: {
      name: "Kundal",
      address: "kundal.net.com@gmail.com"
    },
    to: [userDetails.email, "mohammad@aalzayed.com", "saloom99@windowslive.com"],
    subject: "Order Confirmation",
    html: `
      <html>
        <head>
          <style>
            /* Add your styles for the email here */
            /* Example style */
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .order-details {
              border-collapse: collapse;
              width: 100%;
            }
            .order-details th, .order-details td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .order-details th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Hello, ${userDetails.firstName}!</h1>
          <p>Your order has been confirmed. Below are the details:</p>
          
          <h2>Delivery Details:</h2>
          <p>
            Name: ${userDetails.firstName} ${userDetails.lastName}<br>
            Address: ${userDetails.houseNumber}, ${userDetails.street}, ${userDetails.block}, ${userDetails.area}, ${userDetails.jada}<br>
            Phone: ${userDetails.phone}<br>
            Email: ${userDetails.email}
          </p>
          
          <h2>Ordered Items:</h2>
          <table class="order-details">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
            ${itemsHTML}
              
            </tbody>
          </table>
          
          <p>Thank you for shopping with us!</p>
        </body>
      </html>
    `
  }).then((r) => {
   console.log(r)
  });


  res.json({
    success: "true"
  })
})
router.get('/admin/getAllOrder', async (req, res) => {
  const getAllOrder = await PurchaseModel.find({});
  res.json(getAllOrder)
})


router.post('/getEmailPhonePurchasedCount', async (req, res) => {
  const { email, phone } = req.body;
  const emailItem = await PurchaseModel.find({ email: email });
  const phoneItem = await PurchaseModel.find({ phone: phone })
  res.json({
    phone: phoneItem.length,
    email: emailItem.length
  })
});

module.exports = router