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

const haveRole = (...roles) => {

    return (req, res = response, next) => { //! Este return es una función que se ejecutará dentro del middleware en las rutas del delete.

        //! Verifiar que haya un JWT válido.
        if (!req.user) {
            res.status(500);
            return res.json({
                message: 'Se requiere validar el rol sin validar el token primero.'
            })
        }

        if (!roles.includes(req.user.rol)) {
            res.status(401);
            return res.json({
                message: `El servicio require un rol tipo: ${roles}`
            });
        }

        next();
    }

}

module.exports = {
    isAdminRole,
    haveRole
}