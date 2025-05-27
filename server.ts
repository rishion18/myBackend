import express from 'express'
import ApiRoute from './routes/index'
import { connectToDb } from './utils/connectToDb'
import { AppError, errorHandler } from './middlewares/errorHandler'
import cors from 'cors'

const startServer = async () => {
    const app = express()
    const port = process.env.PORT || 5000

    console.log('process.env.FRONTEND_URL', process.env.FRONTEND_URL_DEV)
    app.use(cors({
        origin: process.env.FRONTEND_URL_DEV, //
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    }))

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/api/v1', ApiRoute)

   // Handle unmatched routes (404)
    app.use((req, res, next) => {
        const error = new AppError('Not Found', 404)
        next(error)
    })

    app.use(errorHandler)

    app.listen(port, () => {
        connectToDb()
        console.log(`Server is running on port ${port}`)
    })
}

export default startServer
