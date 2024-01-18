
const express = require("express");
const { handleGetAllCategoryForSurvey, handleAddSurvey, handleGetAllSurvey, handleGetSpecificSurvey, handleDeleteSurvey } = require("../controllers/Survey");
const router = express.Router();


router.get("/getAllProduct",handleGetAllCategoryForSurvey);
router.get("/getAllSurvey",handleGetAllSurvey);
router.get("/getSurvey/:id",handleGetSpecificSurvey);
router.delete("/deleteSurvey/:id",handleDeleteSurvey);

router.post("/add",handleAddSurvey);




module.exports = router;