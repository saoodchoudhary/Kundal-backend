
const express = require("express");
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');


const router = express.Router();

const { handleDeleteCategory, handleAddCategory, handleUpdateCategory, handleGetAllCategory, handleGetAdminCategory, handleHideShowCategory } = require("../controllers/AddCategory");



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

router.post("/addCategory",upload.single("image"), handleAddCategory);

router.post("/category/hideShow", handleHideShowCategory);

router.put("/updateCategory/:id", handleUpdateCategory);


router.delete("/deleteCategory/:id", handleDeleteCategory);
router.get("/getAllCategory", handleGetAllCategory);

router.get("/admin/getAllCategory", handleGetAdminCategory);

module.exports = router