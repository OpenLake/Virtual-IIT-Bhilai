import 'phaser';
import { GridEngine } from 'grid-engine';
import { io, Socket } from 'socket.io-client'
import { Player } from '../interface'

export class CampusScreen extends Phaser.Scene {
    gridEngine: GridEngine;
    socket: Socket;
    constructor() {
        super({
            key: "CampusScreen"
        })
        
        this.socket = io('http://localhost:9999');

        this.socket.on("connection", () => {
            console.log("Connected to server")
            console.log(this.socket.id)
        });

        this.socket.emit('newPlayer'); // Ask for new player

        this.socket.on("allPlayers", (players : Player[]) => {
            console.log('Received list of all players');
            console.log(players);
            players.forEach(player => this.addNewPlayer(player));
        });

        this.socket.on("newPlayer", (player : Player) => {
            console.log("New player arrived adding him to the game");
            console.log(player);
            this.addNewPlayer(player);
        })

        this.socket.send("Hello from CampusScreen")

        this.socket.on("locationUpdate", (player: Player) => {
            if(player.socketId !== this.socket.id){
                this.updatePlayerLocation(player);
            }
        })

        this.socket.on("message", (data) => {
            console.log(`Message: ${data}`);
        })


        this.socket.on("removePlayer", (player : Player) => {
            console.log("A player just left the game. Removing..");
            console.log(player);
            this.removePlayer(player);
        })

    }

    updatePlayerLocation(player: Player): void {
        this.gridEngine.setPosition(player.socketId, {x: player.x, y : player.y})
    }


    addNewPlayer(player: Player): void {
        const playerSprite = this.add.sprite(player.x, player.y, "player");
        playerSprite.scale = 1.5;
        this.gridEngine.addCharacter({
            id: player.socketId,
            sprite: playerSprite,
            walkingAnimationMapping: 6,
            startPosition: {
                x: player.x,
                y: player.y
            }
        })
        if(this.socket.id === player.socketId){
            this.cameras.main.startFollow(playerSprite, true);
            this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);
        }
    }

    removePlayer(player: Player): void {
        this.gridEngine.removeCharacter(player.socketId);
    }

    preload(/*params : any*/): void {
        this.load.setBaseURL(
            "https://annoraaq.github.io/grid-engine/examples/");
        this.load.image("tiles", "assets/cloud_tileset.png");
        this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
        this.load.spritesheet("player", "assets/characters.png", {
            frameWidth: 52,
            frameHeight: 72,
        });

    }

    create(): void {
        const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
        cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
        for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
            const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
            layer.scale = 3;
        }

        const gridEngineConfig = {
            characters: [],
        };

        this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        const playerToMove = this.socket.id;

        let direction = "";

        if (cursors.left.isDown) {
            direction = "left";
        } else if (cursors.right.isDown) {
            direction = "right";
        } else if (cursors.up.isDown) {
            direction = "up";
        } else if (cursors.down.isDown) {
            direction = "down";
        }
        if(direction !== '' && this.socket.id){
            this.gridEngine.move(playerToMove, direction as any);
            const position = this.gridEngine.getPosition(this.socket.id);
            this.socket.emit('locationUpdate', position);
        }
    }
}