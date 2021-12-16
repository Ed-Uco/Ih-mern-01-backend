//1. Import
const express           =require("express")
const router            =express.Router()

const storeController  =require("./../controllers/store.Controller")




//2. Ruteo (Router)
//Crear Tienda
router.post("/create", storeController.create)

// LEER TIENDAS
router.get("/readall", storeController.readAll)

//Leer una tienda 
router.get("/readone/:id", storeController.readOne)

//Actualizar tienda
router.put("/edit/:id", storeController.edit)

//Delete tienda
router.delete("/delete/:id", storeController.delete)


//Exportaciones
module.exports = router
