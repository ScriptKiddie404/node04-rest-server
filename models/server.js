const express = require('express');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Cargar middleware
        this.middleware();

        // Cargar rutas
        this.routes();

    }

    middleware() {

        this.app.use(express.static('public'));
        this.app.use(cors());

    }

    routes() {

        this.app.use('/api/users', require('../routes/users.router'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        })
    }

}

module.exports = Server;