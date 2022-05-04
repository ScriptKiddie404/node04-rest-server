const getUsers = (req, res) => {
    res.json({
        msg: 'api-get'
    });
}

const postUsers = (req, res) => {
    res.json({
        msg: 'api-post'
    });
}

const putUsers = (req, res) => {
    res.json({
        msg: 'api-put'
    });
}

const deleteUsers = (req, res) => {
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