const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validateFields } = require('../middleware/validate-fields');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/users.controller');
const { isValidRole } = require('../helpers/db-validators')
const { emailExists } = require('../helpers/validators')

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre de usuario debe ser mayor o igual a 3 caracteres.').isLength({ min: 3 }),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El correo no es valido.').isEmail(),
    check('email').custom(emailExists),
    check('password', 'La contrañseña debe ser de al menos ocho caracteres.').isLength({ min: 8 }),
    check('rol').custom(isValidRole),
    validateFields //!! Custom middleware
], postUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);



module.exports = router;