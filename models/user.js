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
        type: String,
        required: true
    },

    imagen: {
        type: String,
    },

    role: {
        type: String,
        required: true
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