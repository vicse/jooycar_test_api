import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as mongoose.ConnectOptions

export const dbConnection = async() => {

    const { MONGODB_CNN, MONGODB_CNN_TEST, NODE_ENV } = process.env;

    const dbUri = (NODE_ENV === 'test' ? MONGODB_CNN_TEST : MONGODB_CNN) || 'localhost';

    try {

        if (dbUri === 'inmemory') {

            const mongoServer: MongoMemoryServer = await MongoMemoryServer.create();
            const mongoUrl = mongoServer.getUri();
            await mongoose.connect(mongoUrl, opts);
            
        } else {

            await mongoose.connect(dbUri, opts);
            console.log('Base de datos online');

        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la base de datos');
    }
    
}
