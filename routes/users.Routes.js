//1. Import
const express           =require("express")
const router            =express.Router()

const userController  =require("./../controllers/user.Controller")




//2. Ruteo (Router)

router.post("/create", userController.create)




//Exportaciones
module.exports = router
