//!! Desestructuración sólo para obtener el intellisense de VSC:
const { request, response } = require('express');


const getUsers = (req = request, res = response) => {


    /*
        !!Reminder:
        Supongamos que hacemos un get tipo: localhost:3000/api?q=hola&name=adasas&id=3
        Para obtener el query se usa:
        const query = req.query;
        O bien, una desestructuración:
        const {q, name, id} = req.query
    */

    res.json({
        msg: 'api-get'
    });
}

const postUsers = (req = request, res = response) => {

    // const body = req.body

    const { id, name, age } = req.body;

    res.json({
        msg: 'api-post',
        id,
        name,
        age
    });
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