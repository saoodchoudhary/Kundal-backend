
const path = require('path');
const fs = require('fs');
const AddProductModel = require("../model/AddProductModel");


const handleAddProduct = (req, res) => {
   const { category, title, description, price, fragrance, discountPrice, stock, unit, weight, brand, tag, oldPrice, ingredients } = req.body;

   AddProductModel.create({
      title: title,
      description: description,
      price: price,
      category: category,
      discountPrice: discountPrice,
      fragrance: fragrance,
      ingredients: ingredients,
      stock: stock,
      unit: unit,
      brand: brand,
      weight: weight,
      tag: tag,
      image: req.file.filename,

   })
      .then(result => {
         res.json({ success: true })
      })
      .catch(() => res.json({ success: false }))

}

const updateProduct = async (req, res) => {
   const { id, title, description, fragrance, ingredients, stock } = req.body;
   await AddProductModel.findByIdAndUpdate({ _id: id }, {
      fragrance: fragrance,
      ingredients, ingredients,
      description, description,
      title: title,
      stock: stock
   }).then(() => {
      res.json({
         sucess: "success"
      })
   }).catch((error) => {
      console.log(error)
      res.json({
         success: "fails"
      })
   })
}

const hideShowProduct = async (req, res) => {
   console.log("hello")
   console.log(req.body)
   const { _id, status } = req.body;
   let value = ""
   if (status === "show") {
      value = "hide"

   } else {
      value = "show"
   }
   console.log(_id)
   await AddProductModel.findByIdAndUpdate({_id:_id},{
      status: value
   }).then(() => {
      res.json({
         sucess: "success"
      })
   }).catch((error) => {
      console.log(error)
      res.json({
         success: "fails"
      })
   })
}

const handleGetAllProduct = (req, res) => {
   AddProductModel.find({status:"show"})
      .then((result) => {

         res.json(result);
      })
      .catch(() => {
         res.json({
            success: false,
            error: 'Failed to fetch all product'
         });
      })
}


const handleGetAllAdminProduct = (req, res) => {
   AddProductModel.find()
      .then((result) => {

         res.json(result);
      })
      .catch(() => {
         res.json({
            success: false,
            error: 'Failed to fetch all product'
         });
      })
}

const handleGetCategoryProduct = (req, res) => {
   AddProductModel.find({status:"show", category: req.params.id })
      .then((result) => {

         res.json(result);
      })
      .catch(() => {
         res.json({
            success: false,
            error: 'Failed to fetch category Product'
         });
      })
}
const handleOneProduct = (req, res) => {
   AddProductModel.find({ _id: req.params.id })
      .then((result) => {

         res.json(result[0]);
      })
      .catch(() => {
         res.json({
            success: false,
            error: 'Failed to fetch category Product'
         });
      })
}
const handleGetDeleteProduct = (req, res) => {
   // const fileName = req.params.fileName; // Get the file name to be deleted

   AddProductModel.findByIdAndDelete({ _id: req.params.id })

      .then((result) => {

         const fileName = result.image;

         // Replace 'public/Images' with your actual image storage folder
         const filePath = path.join('public/Images', fileName);

         // Check if the file exists
         if (fs.existsSync(filePath)) {

            // Delete the file
            fs.unlinkSync(filePath);

            res.json({
               success: true,
               message: 'File deleted successfully'
            });

         } else {
            res.json({
               error: 'File not found',
               success: false
            });
         }
      })
      .catch(() => {
         res.json({
            success: false,
            error: 'Failed to delete Product'
         });
      })
}

module.exports = {
   handleAddProduct,
   handleGetAllProduct,
   handleGetCategoryProduct,
   handleGetDeleteProduct,
   handleOneProduct,
   updateProduct,
   hideShowProduct,
   handleGetAllAdminProduct
}