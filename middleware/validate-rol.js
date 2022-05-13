const { response } = require("express");

const isAdminRole = (req, res = response, next) => {


    if (!req.user) {
        res.status(500);
        return res.json({
            message: 'Se requiere validar el rol sin validar el token primero.'
        })
    }

    const { rol, name } = req.user;

    if (rol !== 'ADMIN_ROLE') {
        res.status(401);
        return res.json({
            message: 'El usuario no es un administrador.'
        });
    }

    next();

}

module.exports = {
    isAdminRole
}