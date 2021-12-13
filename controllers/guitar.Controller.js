//Import
const Guitar = require("./../models/Guitar")



exports.create = async (req,res) =>{
    
    //Del form - creamos variables y asignamos valores.
    const { 
        nombre,
        precio,
        color,
        imagen,
        descripcion
     } = req.body

     //Crear Guitarra en BD
     try{
        const newGuitar = await Guitar.create({
            nombre,
            precio,
            color,
            imagen,
            descripcion
        })

        //Devolver una respuesta en un formato json
        res.json({
            msg: "Guitarra creada con exito",
            data: newGuitar
        })

     }catch (error){
        res.status(500).json({
            msg: "Hubo un error creando la guitarra",
            error
        })
     }

}


exports.readAll = async (req, res) => {

	try {
		
		const guitars = await Guitar.find({})

		res.json({
			msg: "Guitarras obtenidas con éxito.",
			data: guitars
		})


	} catch (error) {
		
		res.status(500).json({
	 		msg: "Hubo un error obteniendo los datos",
			error: error
		})

	}

}


exports.readOne = async (req, res) => {

	const { id } = req.params

	try {
		
		const guitar = await Guitar.findById(id)

		res.json({
			msg: "Guitarra obtenida con éxito.",
			data: guitar
		})

	} catch (error) {
		res.status(500).json({
			msg: "hubo un error obteniendo los datos.",
			error: error
		})
	}

}


//-------------------EDIT-------------------
exports.edit = async (req, res) => {

    const { id } = req.params

    const { 
        nombre,
        precio,
        color,
        imagen,
        descripcion
     } = req.body

     try {
        const updateGuitar = await Guitar.findByIdAndUpdate(
            id, 
        {
            nombre,
            precio,
            color,
            imagen,
            descripcion
        },
            {new: true}
        )
        
        res.json({
            msg: "Guitarra actualizada con exito",
            data: updateGuitar
        })

     } catch (error) {
        res.status(500).json({
			msg: "hubo un error obteniendo los datos.",
			error: error
		})
     }
}

//-------------------BORRAR-------------------
exports.delete = async (req, res) => {

	const { id } = req.params

	try {
		
		const deletedGuitar = await Guitar.findByIdAndRemove({_id: id})

		res.json({
			msg: "Guitarra borrada con éxito.",
			data: deletedGuitar
		})

	} catch (error) {
		res.status(500).json({
			msg: "Hubo un error borrando la guitarra.",
			error: error
		})
	}

}