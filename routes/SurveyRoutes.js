
const express = require("express");
const { handleGetAllCategoryForSurvey, handleAddSurvey, handleGetAllSurvey, handleGetSpecificSurvey, handleDeleteSurvey, handleAdminAddProductSurvey, handleGetAllProductSurvey, handleDeleteSurveyProduct, handleGetAllAdminProductSurvey, handleHideShowSurveyProduct, handleGetAllSpecificProductAdminSurvey } = require("../controllers/Survey");
const router = express.Router();


router.get("/getAllProduct",handleGetAllCategoryForSurvey);
router.get("/getAllSurvey",handleGetAllSurvey);
router.get("/getSurvey/:id",handleGetSpecificSurvey);
router.delete("/deleteSurvey/:id",handleDeleteSurvey);

router.post("/add",handleAddSurvey);
// product fetch for all user
router.get("/GetAllSurveyProduct", handleGetAllProductSurvey)
// admin

router.post("/admin/addSurveyProduct", handleAdminAddProductSurvey)
router.get("/admin/GetAllSurveyProduct", handleGetAllAdminProductSurvey) // product fetch for admin
router.get("/admin/specificProduct/GetAllSurvey/:id", handleGetAllSpecificProductAdminSurvey) // product fetch for admin
router.delete("/deleteSurveyProduct/:id",handleDeleteSurveyProduct);
router.post("/hideSurveyProduct",handleHideShowSurveyProduct);






module.exports = router;