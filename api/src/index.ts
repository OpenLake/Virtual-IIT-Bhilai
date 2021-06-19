import express from "express";
import {Server, Socket} from "socket.io";
import {createServer} from 'http'

const port = 6789;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});


io.on("connection", (socket: Socket) => {
    socket.send("Hello");

    socket.on("message", (data) => {
        console.log(data);
    })
})


app.get('/', (req,res) => {
    res.send('Hello World');
})



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})