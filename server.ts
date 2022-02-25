import express, { Application } from 'express';

import cors from 'cors';

import { dbConnection } from './database/config';
import tripRoutes from './routes/trip.route';

class Server {

    private app: Application;
    private port: string;
    private apiPath = '/api/trips/v1';

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() { 
        await dbConnection();
    }

    middlewares() {
        
        this.app.use( cors() );

        this.app.use( express.json() );

    }

    routes() {
        this.app.use( this.apiPath, tripRoutes)
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto! ' + this.port);
        });
    }

}

export default Server;
