const express = require('express');

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

    }

    routes() {

        this.app.get('/home', (request, response) => {
            response.send('This is home :)');
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        })
    }

}

module.exports = Server;