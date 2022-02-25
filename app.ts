import dotenv from 'dotenv';
import { createServer } from './src/utils/server';

dotenv.config();

// export const server = new Server();

// server.listen();

(async() => {

    const port = process.env.PORT || '3000';

    try {
        
        const server = await createServer();
        server.listen( port, () => {
            console.log('Servidor corriendo en puerto! ' + port);
        });
        
    } catch (error) {
        console.log(`Error: ${error}`);
    }

})();