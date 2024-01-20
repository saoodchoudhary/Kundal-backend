const express = require("express");
const mongoose = require('mongoose')
const { handleAddProduct, handleGetAllProduct, handleGetCategoryProduct, handleGetDeleteProduct, handleOneProduct, updateProduct, hideShowProduct, handleGetAllAdminProduct, handleGetAllCategoryProduct } = require("../controllers/AddProduct");

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

router.post("/update/product", updateProduct)

router.post("/product/hide_show", hideShowProduct)

router.get("/product", handleGetAllProduct)
router.get("/product/admin", handleGetAllAdminProduct)

router.get("/product/:id", handleOneProduct)

router.get("/product/category/:id" , handleGetCategoryProduct)
router.get("/product/allCategory/:id" , handleGetAllCategoryProduct)

router.delete("/product/delete/:id" , handleGetDeleteProduct)



module.exports = router;