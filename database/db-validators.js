const Role = require('../models/role');

const isValidRole = async (rol = '') => {

    const roleExists = await Role.findOne({ rol });

    if (!roleExists) {
        throw new Error(`El rol ${rol} no se encuentra regigstrado en la base de datos.`);
    }

}

module.exports = {
    isValidRole
}