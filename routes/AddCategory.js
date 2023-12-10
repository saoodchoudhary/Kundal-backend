
const express = require("express");
const mongoose = require('mongoose')


const router = express.Router();

const { handleDeleteCategory, handleAddCategory, handleUpdateCategory, handleGetAllCategory } = require("../controllers/AddCategory");

router.post("/addCategory", handleAddCategory)

router.put("/updateCategory/:id", handleUpdateCategory)

router.delete("/deleteCategory/:id", handleDeleteCategory)
router.get("/getAllCategory", handleGetAllCategory)

module.exports = router