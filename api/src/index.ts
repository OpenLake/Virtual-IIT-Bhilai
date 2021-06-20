import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from 'http'
import cors from 'cors'
import { Player } from './interface'

const port = 9999;

const app = express();

app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});



io.on("connection", (socket: Socket) => {
    console.log("Someone just joined the game")

    socket.on("connection", () => {
        console.log(`${socket.id} has entered the game`);
        socket.send("Hello from server");
    })

    let player = {}

    socket.on("newPlayer", () => {
        console.log(`${socket.id} has asked for a new player`)
        const player = game.newPlayer(socket.id);
        socket.emit('allPlayers', game.getAllPlayers());
        socket.broadcast.emit('newPlayer', player);
        console.log(`${game.getAllPlayers().length} players available`);
    })

    socket.on("locationUpdate", (data) => {
        const updatedPlayerObj = game.updatePlayerLocation(socket.id, data.x, data.y);
        io.emit('locationUpdate',updatedPlayerObj);
    })

    socket.on("message", (data) => {
        console.log(`${socket.id} said: ${data}`);
    })

    socket.on('disconnect', () => {
        const removedPlayer = game.removePlayer(socket.id);
        console.log(`${removedPlayer.username} just left the game`);
        io.emit('removePlayer', player);
        console.log(`${game.getAllPlayers().length} players remaining`);
    });
})

class Game {
    private players : Player[] = [];

    private generateRandomUsername = () => {
        return ""; // TODO
    }

    updatePlayerLocation(socketId: string, x : number, y: number): Player{
        const playerIndexToUpdate = this.players.findIndex(player => player.socketId === socketId);
        this.players[playerIndexToUpdate] = {...this.players[playerIndexToUpdate], x, y};
        return this.players[playerIndexToUpdate];
    }

    newPlayer(socketId: string){
        const newPlayer : Player = {
            socketId: socketId,
            username: socketId, // this.generateRandomUsername(),
            x: randomInt(5,10),
            y: randomInt(5,10),
        }
        this.players.push(newPlayer);
        return newPlayer;
    }
    
    getAllPlayers(){
        return this.players;
    }

    removePlayer(socketId: string){
        const playerIndexToRemove = this.players.findIndex(player => player.socketId === socketId);
        const playerToRemove = this.players[playerIndexToRemove];
        this.players.splice(playerIndexToRemove, 1);
        return playerToRemove;
    }
}

const game = new Game();



const randomInt = (low: number, high :number) => Math.floor(Math.random() * (high - low) + low)

app.get('/', (req, res) => {
    res.send('Hello World');
})

httpServer.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})