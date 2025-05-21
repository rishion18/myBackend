import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

//routes
import ApiRoute from './routes/index'
import { connectToDb } from './utils/connectToDb'

const startServer = async () => {
    const app = express()

    const port = process.env.PORT || 5000;
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))


    app.use('/api/v1', ApiRoute)

    app.listen(port, () => {
        connectToDb()
        console.log(`Server is running on port ${port}`)
    })

}

export default startServer