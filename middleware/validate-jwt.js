const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    // ! Mandamos alv al usuario si no trae el token en el header.
    if (!token) {
        res.status(401);
        return res.json({
            message: 'No hay token.'
        });
    }


    try {

        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY); //! Hacmos desestruct del payload.

        const user = await User.findById(uid); //! Este nos devuelve todo el usuario que hizo la authenticación una vez que validamos el token.

        if (!user) {
            res.status(401);
            return res.json({
                message: 'El usuario no existe en la base de datos.'
            })
        }

        //! Validar que el usuario no haya sido eliminado previamente: estatus != false
        if (!user.estatus) {
            res.status(400);
            return res.json({
                message: 'El usuario posee un estatus inactivo.'
            });
        }

        req.user = user;

        next(); //! Seguimos con el resto de middlewares.   

    } catch (error) {
        console.log(error);
        res.status(401);
        res.json({
            message: 'Token no válio.'
        });
    }

}

module.exports = {
    validateJWT
}