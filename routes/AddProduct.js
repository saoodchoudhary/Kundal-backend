const express = require("express");
const mongoose = require('mongoose')
const { handleAddProduct, handleGetAllProduct, handleGetCategoryProduct, handleGetDeleteProduct, handleOneProduct } = require("../controllers/AddProduct");

const router = express.Router();

const multer = require('multer');
const path = require('path');
const { AdminAuth } = require("../middleware/AdminAuth");


const storage = multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null, 'public/Images')
   },
   filename: (req, file ,cb )=>{
      cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname))
   }
});

const upload = multer({
   storage: storage
})

router.post("/uploadImage", upload.single('file') , handleAddProduct)

router.get("/product", handleGetAllProduct)

router.get("/product/:id", handleOneProduct)

router.get("/product/category/:id" , handleGetCategoryProduct)

router.delete("/product/delete/:id" , handleGetDeleteProduct)



module.exports = router;