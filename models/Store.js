//1. IMPORT
const mongoose          =require("mongoose")


//2.SCHEMA
const storeSchema = mongoose.Schema({
    domicilio: {
        type: String,
        require: true
    },
    telefono: Number
})



//3. MODEL
const Store = mongoose.model("Store", storeSchema)


// 4. EXPORTACIÓN
module.exports = Store