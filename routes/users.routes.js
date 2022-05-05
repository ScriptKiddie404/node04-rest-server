const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validateFields } = require('../middleware/validate-fields');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/users.controller');
const { isValidRole } = require('../database/db-validators')

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre de usuario debe ser mayor o igual a 3 caracteres.').isLength({ min: 3 }),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El correo no es valido.').isEmail(),
    check('password', 'La contrañseña debe ser de al menos ocho caracteres.').isLength({ min: 8 }),
    // check('role', 'El rol no es válido.').isIn(['ADMIN_ROLE', 'USER_ROLE', 'MODERATOR_ROLE']), --> Cambiar por una validación contra la base de datos.

    check('rol').custom(isValidRole),

    validateFields //Nuestro propio middleware
], postUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);



module.exports = router;