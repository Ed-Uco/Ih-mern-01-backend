//1. Import
const express           =require("express")
const router            =express.Router()

const storeController  =require("./../controllers/store.Controller")




//2. Ruteo (Router)
//Crear Guitarra
router.post("/create", storeController.create)

// LEER GUITARRAS
router.get("/readall", storeController.readAll)

//Leer una guitarra 
router.get("/readone/:id", storeController.readOne)



//Exportaciones
module.exports = router
