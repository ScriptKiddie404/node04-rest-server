const express = require('express');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Llamada a las rutas:
        this.routes();

    }

    routes() {

        this.app.get('/', (request, response) => {
            response.send('We\'re ready!');
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        })
    }

}

module.exports = Server;