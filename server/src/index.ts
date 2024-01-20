import * as dotenv from 'dotenv'
import express from "express"

import { connectToDatabase } from "./config/connection";
import { db } from "./utils/db.server";

dotenv.config()

//connect to the Database
connectToDatabase()

const app = express()
app.use(express.json())

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})