const User = require('../models/user')

//!! Validar que el correo no exista previamente en la base de datos.
const emailExists = async (email = '') => {

    const currentEmail = await User.findOne({ email });

    if (currentEmail) {
        throw new Error('El correo ya se encuentra registrado.');
    }


}

module.exports = {
    emailExists
}