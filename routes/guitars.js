//1. Import
const express           =require("express")
const router            =express.Router()

const guitarController  =require("./../controllers/guitar.Controller")




//2. Ruteo (Router)
//Crear Guitarra
router.post("/create", guitarController.create)

// LEER GUITARRAS
router.get("/readall", guitarController.readAll)

//Leer una guitarra 
router.get("/readone/:id", guitarController.readOne)

//Actualizar guitarra
router.put("/edit/:id", guitarController.edit)

//Delete guitarra
router.delete("/delete/:id", guitarController.delete)


//Exportaciones
module.exports = router
