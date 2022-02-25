import mongoose from 'mongoose';

export const dbConnection = async() => {

    const dbUri: string = process.env.MONGODB_CNN || 'localhost:3306';

    try {

        await mongoose.connect(dbUri, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as mongoose.ConnectOptions);

        console.log('Base de datos online')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la base de datos');
    }
    
}
