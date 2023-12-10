const express = require("express");
const { handleCreateAdminUser, handleDeleteAdminUser, handleLoginAdmin, handleGetAllAdminUser } = require("../controllers/AdminUser");
const router = express.Router();


router.post("/createAdmin", handleCreateAdminUser)


router.delete("/deleteAdmin/:id", handleDeleteAdminUser)

router.post("/loginAdmin", handleLoginAdmin)
router.get("/getAllAdminUser", handleGetAllAdminUser)

module.exports = router
