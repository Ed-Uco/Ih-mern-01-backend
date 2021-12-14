//1. Import
const express           =require("express")
const router            =express.Router()

const userController  =require("./../controllers/user.Controller")
const authorization   =require("./../middleware/authorization")


// 2. ROUTER
// CREAR USUARIO
router.post("/create", userController.create)

// INICIAR SESIÓN DE USUARIO
router.post("/login", userController.login)


//Verificacion de USUARIO
router.get("/verifytoken", authorization, userController.verifyToken)


// 3. EXPORTACIÓN
module.exports = router