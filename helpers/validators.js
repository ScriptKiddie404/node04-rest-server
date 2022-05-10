const User = require('../models/user')

//!! Validar que el correo no exista previamente en la base de datos.
const emailExists = async (email = '') => {

    const currentEmail = await User.findOne({ email });

    if (currentEmail) {
        throw new Error('El correo ya se encuentra registrado.');
    }


}


// !! Validar que el id no exista en la BD.
const userExistsById = async (id) => {

    // !! Verificar que el usuario exista en la BD buscando por su ID
    const userExists = await User.findById(id);

    if (!userExists) {
        throw new Error(`No existe un usuario con el id ${id}`);
    }

}

module.exports = {
    emailExists,
    userExistsById
}