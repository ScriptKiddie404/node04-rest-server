//!! Desestructuración sólo para obtener el intellisense de VSC:
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const user = require('../models/user');

const getUsers = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;

    const users = await User.find().limit(Number(limit)).skip(Number(from)) //!! Es necesario parsear a number, el skip funciona como un "desde" para la paginación.

    res.json({ users });

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
