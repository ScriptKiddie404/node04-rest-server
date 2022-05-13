const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/users.controller');

const { isValidRole } = require('../helpers/db-validators')
const { emailExists, userExistsById } = require('../helpers/validators');

const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');
const { isAdminRole } = require('../middleware/validate-rol');


const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre de usuario debe ser mayor o igual a 3 caracteres.').isLength({ min: 3 }),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El correo no es valido.').isEmail(),
    check('email').custom(emailExists),
    check('password', 'La contrañseña debe ser de al menos ocho caracteres.').isLength({ min: 8 }),
    check('rol', 'Se debe ingresar un rol.').not().isEmpty(),
    check('rol').custom(isValidRole),
    validateFields 
], postUsers);

router.put('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('rol').custom(isValidRole),
    check('id').custom(userExistsById),
    check('rol', 'El rol es obligatorio.').not().isEmpty(),
    validateFields
], putUsers);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], deleteUsers);



module.exports = router;