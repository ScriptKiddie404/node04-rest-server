const bcryptjs = require("bcryptjs");
const { request, response } = require("express");

const User = require('../models/user')


const login = async (req = request, res = response) => {

    const { email, password } = req.body;


    try {

        //! Verificar si existe el correo
        const user = await User.findOne({ email });
        //* En caso de que el usuario no se encuentre registrado, devolvemos una respuesta 400.
        if (!user) {
            res.status(400);
            return res.json({ message: 'El usuario o contraseña no son correctos.' })
        }


        // !! Verificar si el usuario está en estatus activo.
        if (!user.estatus) {
            res.status(400);
            return res.json({ message: 'Hubo un error inesperado.' })
        }

        // !!vrificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400);
            return res.json({ message: 'El usuario o contraseña no son correctos.' });
        }

        // !! Generar JWT




    } catch (error) {

        console.log(error);

        res.status(500);

        return res.json({ mesage: 'Ocurrió un error inesperado.' })
    }

    res.json({ msg: "login correcto" });

}

module.exports = { login }