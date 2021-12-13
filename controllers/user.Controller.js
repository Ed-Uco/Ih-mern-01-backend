
const bcrypt = require("bcryptjs")
const User =require("./../models/User")

const jwt		= require("jsonwebtoken")



exports.create = async (req, res) => {

	//1. Obtener usuario, email y password del formulario (REQ)
    const {
        nombre,
        apellido,
        pais,
        direccion,
        email,
        password
    } = req.body
    
    //2. Realizar el proceso asincrono
    try {
        
        //Generar pass para BD
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //console.log(hashedPassword)

        //Crear usuario en BD
        const newUser = await User.create({
            nombre,
            apellido,
            pais,
            direccion,
            email,
            password: hashedPassword
        })
        //Autenticacion con TOKENS
        const payload = {
            user: {
                id: newUser._id //ID DE MONGODBD DEL USUARIO
            }
        }
        //Firmar el token
        jwt.sign(
            payload, //Datos que acompañaran al token
            process.env.SECRET, // PALABRA SECRETA (Firma)
            {
                expiresIn: 360000 // Expiracion del Token
            },
            (error, token) =>{
                if(error) throw error

				res.json({
					msg: "Token correctamente generado.",
					data: token
				})
            }
        )
        //Crear en post man un test de que se crea
        // res.json({
        //     data: newUser
        // })

    } catch (error) {
        //En caso de error con await
        res.status(500).json({
            msg: "Hubo un error en la creacion de usuarios",
            error
        })

    }

}