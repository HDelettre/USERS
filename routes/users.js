// IMPORT MODULES
const express = require("express");
const router = express.Router();
// IMPORT PATH FILE
const ctrlPath = require("../controllers/users");
// DEFINITION ROUTES
router.post("/signup", multer, ctrlPath.signupControllers);
router.post("/login", ctrlPath.loginControllers);
router.get("/", ctrlPath.getAllUsersControllers);
router.get("/:id", ctrlPath.getOneUsersControllers);
router.patch("/:id",multer, ctrlPath.updateUsersControllers);
router.delete("/:id", ctrlPath.deleteUsersControllers);
// EXPORT
module.exports = router;