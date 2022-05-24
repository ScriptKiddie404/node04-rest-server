const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-fields');


const router = Router();

router.post('/login', [
    check('email', 'El correo debe tener un formato válido.').isEmail(),
    check('email', 'El correo no puede estar vacío.').not().isEmpty(),
    check('password', 'La contraseña es un campo obligatorio.').not().isEmpty(),
    validateFields
], login)

router.post('/google', [
    check('id_token', 'El id token es necesario.').not().isEmpty(),
    validateFields
], googleSignIn)

module.exports = router;