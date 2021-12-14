//Desencriptar el JWT
const jwt           =require("jsonwebtoken")

const decrypt = async(req,res,next) =>{

    //Capturar el token y guardarlo en una variable
    const token = req.header("x-auth-token")
    //Si no hay token:
    if (!token) {
        return res.status(400).json({
            msg: "No hay token, permiso no valido"
        })
    }

    //Si hay token y todo bien:
    try {
        
		const openToken = await jwt.verify(token, process.env.SECRET)

		console.log("openToken", openToken)

		req.user = openToken.user

		next()

	} catch (error) {
		
		console.log(error)

		res.json(
			{
				msg: "Hubo un error con el token."
			}
		)
	}
}


module.exports = decrypt