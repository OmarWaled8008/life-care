import { db } from "../utils/db.server";

const connectToDatabase = async () => {
    await db.$connect()
    .then(() => {
        console.log('Prisma Client connected successfully!');
    })
    .catch((error: Error) => {
        console.error('Error connecting to the database:', error);
    });
};

export {connectToDatabase}




