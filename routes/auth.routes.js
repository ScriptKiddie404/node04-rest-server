const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-fields');


const router = Router();

router.post('/login', [
    check('email', 'El correo debe tener un formato válido.').isEmail(),
    check('email', 'El correo no puede estar vacío.').not().isEmpty(),
    check('password', 'La contraseña es un campo obligatorio.').not().isEmpty(),
    validateFields
], login)

module.exports = router;