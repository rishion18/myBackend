import { Server } from "socket.io";

const initSocketServer = (io: Server) => {
    
    io.on('connection', (socket) => {
        console.log('connected')
   




        socket.on('disconnect', () => {
            console.log('disconnected')
        })
    })

}

export default initSocketServer