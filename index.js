//1.Import 
const express           =require("express")
const app               =express()

require("dotenv").config()

const connectDB         =require("./config/db")


//2. Middlewares
//BASE DE DATOS 
connectDB()


//Todas las peticiones y respuestas se manejan en el protocolo json
app.use(express.json())



//3. Rutas
app.use("/guitars", require("./routes/guitars"))
app.use("/stores", require("./routes/stores.Routes"))




//4.Server
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor trabajando en http://localhost:${process.env.PORT}`)
})