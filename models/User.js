//1. IMPORT
const mongoose          =require("mongoose")


//SCHEMA
const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    apellido:{
        type: String,
        default: ""
    },
    direccion:{
        type: String,
        default: ""
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

// 3. MODELOS
const User = mongoose.model("User", userSchema)

// 4. EXPORTACIÓN
module.exports = User

