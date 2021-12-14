
const bcrypt = require("bcryptjs")
const User =require("./../models/User")

const jwt		= require("jsonwebtoken")


//------------------CREAR USUARIO--------------------//
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

//------------------INICIAR SESION--------------------//
//Autenticar que la persona pase su email y contraseña, coincidan y se le envia token
exports.login = async (req, res) => {

	//1. Obtener usuario, email y password del formulario (REQ)
    const { email, password } = req.body
    
    //2. Realizar el proceso asincrono
    try {
        //Encontrar un usuario este en base de datos
        const foundUser = await User.findOne({ email })
        //3. Validacion
        if(!foundUser) {
            return res.status(400).json({
                msg: "El usuario o la contraseña son incorrectos"
            })
        }

        //4. Si todo ok. El usuario fue encontrado, entonces, evaluamos la contraseá
        const verifiedPass = await bcrypt.compare(password, foundUser.password)

        //5. Validacion - si el password no coincide
        if (!verifiedPass) {
            return await res.status(400).json({
                msg: "El usuario o la contraseña no coinciden"
            })
        }

        //6. Si todo coinciden y es correcto 
        console.log("foundUser:", foundUser)
        //6A. Establecer un payload (datos del usuario)
        const payload = {
            user: {
                id: foundUser.id
            }
        }
        //6B Firma del JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) =>{
				if(error) throw error

				res.json({
					msg: "Inicio de sesión exitoso.",
					data: token
				})
			}
		)
		
		return

    } catch (error) {
        //En caso de error con await
        res.status(500).json({
            msg: "Hubo un error con la autenticacion",
            error
        })

    }

}

//------------------VERIFICAR USUARIO--------------------//
//Cuando estamos accediendo a diferentes rutas (guitarras como tiendas) preguntas si el usuario
//tiene los persmisos o no. Entonces, para confirmarlo se le pide su token. 
//Una ruta que pide tokens
exports.verifyToken = async (req,res) =>{

    

    try {
        //1. Buscar el ID del usuario (del token abiertto) en BD
        const foundUser = await User.findById(req.user.id).select("-password")

        res.json({
            msg: "Datos de usuario encontrados",
            data: foundUser
        })


    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: "Hubo un error con el usuario",
            error
        })
    }

}
