
import express from 'express';
import { Express } from 'express-serve-static-core';
import cors from 'cors'; 

import tripRoutes from '../routes/trip.route';
import { dbConnection } from '../database/config';

export const createServer = async(): Promise<Express> => { 

    const apiPath = '/api/trips/v1';

    const app = express();

    // Connect MongoDB
    connectDB();

    // Middlewares
    app.use( cors() );
    app.use( express.json() );

    // Routes
    app.use( apiPath, tripRoutes)

    return app;

};

const connectDB = async() => { 
    await dbConnection();
}


