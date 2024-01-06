
const express = require("express");
const mongoose = require('mongoose')


const router = express.Router();

const { handleDeleteCategory, handleAddCategory, handleUpdateCategory, handleGetAllCategory, handleGetAdminCategory, handleHideShowCategory } = require("../controllers/AddCategory");

router.post("/addCategory", handleAddCategory);

router.post("/category/hideShow", handleHideShowCategory);

router.put("/updateCategory/:id", handleUpdateCategory);


router.delete("/deleteCategory/:id", handleDeleteCategory);
router.get("/getAllCategory", handleGetAllCategory);

router.get("/admin/getAllCategory", handleGetAdminCategory);

module.exports = router