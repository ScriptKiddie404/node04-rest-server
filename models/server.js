const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Cargar middleware
        this.middleware();

        // Conectar a la bd
        this.connectDatabase();

        // Cargar rutas
        this.routes();

    }

    middleware() {

        // Servir contenido estático
        this.app.use(express.static('public'));

        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());

    }

    async connectDatabase() {

        await dbConnection();

    }

    routes() {

        this.app.use('/api/users', require('../routes/users.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        })
    }

}

module.exports = Server;