//!! Desestructuración sólo para obtener el intellisense de VSC:
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = (req, res = response) => {

    res.json({ msg: 'api-get' });

}

const postUsers = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    // Hashear password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({ user });


}

const putUsers = (req = request, res = response) => {

    const id = req.params.id; //!! Se obtiene el id de: /:id => PUT

    res.json({
        msg: 'api-put',
        id
    });
}

const deleteUsers = (req = request, res = response) => {
    res.json({
        msg: 'api-delete'
    });
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
