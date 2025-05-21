import mongoose from 'mongoose'

export const connectToDb = async () => {
    const connectionString = process.env.MONGODB_URI
    if (!connectionString) {
        console.log('No connection string found')
        return
    }
    try{
       const connection = await mongoose.connect(connectionString)
       console.log('Connected to MongoDB', connection.connection.host)
    }catch(err){
        console.log(err)
    }
}