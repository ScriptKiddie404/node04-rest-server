const { model, Schema } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        required: true,
        type: String,
    },

    imagen: {
        type: String,
    },

    rol: {
        type: String,
    },

    estatus: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }

});

// !! Sobreescribimos el método toJSON, para eliminar la contraseña hasheada y el __v por default de mongoDB

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);