import dotenv from 'dotenv'
import express from "express"
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express'
import helmet from "helmet";


import { connectToDatabase } from "./config/connection";
import userRouter from './routes/userRoutes'
import adminRoutr from './routes/adminRoutes'
import doctorRoutr from './routes/doctorRoutes'
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import limiter from './middlewares/rateLimiter';
const swaggerDocument = require('./docs/swagger.json')
dotenv.config()

//connect to the Database
connectToDatabase()


const app = express()
app.use(express.json())
app.use(helmet());
app.use(limiter)



// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routes
app.use(cookieParser(process.env.JWT_SECRET))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRoutr)
app.use('/api/v1/doctor', doctorRoutr)
app.use(notFound)
app.use(errorHandler)

if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})