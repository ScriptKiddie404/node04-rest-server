//!! Desestructuración sólo para obtener el intellisense de VSC:
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const user = require('../models/user');

const getUsers = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    //!! Buscamos sólo cuando los usuarios find => estatus = true
    //!! Es necesario parsear a number, el skip funciona como un "desde" para la paginación.
    // const users = await User.find({ estatus: true }).limit(Number(limit)).skip(Number(from));

    // !! Obetener el total de usuarios.
    // const count = await User.countDocuments({ estatus: true });

    // !! Lanzamos promesas de forma simultánea.
    const [users, total] = await Promise.all([
        User.find({ estatus: true }).limit(Number(limit)).skip(Number(from)),
        User.countDocuments({ estatus: true })
    ]);

    res.json({ total, users });

}

const postUsers = async (req = request, res = response) => {

    const { name, email, password, rol } = req.body;

    const user = new User({ name, email, password, rol });

    // Hashear password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({ user });


}

const putUsers = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if (password) {
        // !! Encriptar password:
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }


    const user = await User.findByIdAndUpdate(id, resto);


    res.json({ user });

}

const deleteUsers = async (req = request, res = response) => {

    const { id } = req.params;

    // !! Para mantener integridad de referencias no borramos al usuario, sino que cambiamos su estatus a false (usuario inactivo).
    const user = await User.findByIdAndUpdate(id, { estatus: false });

    res.json({ user });

}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}

/*
    !!Reminder:
    Supongamos que hacemos un get tipo: localhost:3000/api?q=hola&name=adasas&id=3
    Para obtener el query se usa:
    const query = req.query;
    O bien, una desestructuración:
    const {q, name, id} = req.query
*/
