import express from 'express'
import ApiRoute from './routes/index.js'
import { connectToDb } from './utils/connectToDb.js'
import { AppError, errorHandler } from './middlewares/errorHandler.js'
import http from 'http'
import { Server } from 'socket.io'

import cors from 'cors'
import initSocketServer from './controllers/socket.js'

const startServer = async () => {
    const app = express()
    const server = http.createServer(app)

    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL_DEV,
            methods: ['GET', 'POST'],
            credentials: true,
        }
    })

    initSocketServer(io);

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

    server.listen(port, () => {
        connectToDb()
        console.log(`Server is running on port ${port}`)
    })
}

export default startServer
