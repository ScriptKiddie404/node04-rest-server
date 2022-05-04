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

    role: {
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

module.exports = model('User', UserSchema);