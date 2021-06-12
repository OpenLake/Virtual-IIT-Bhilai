import './style.css'

import { GridEngine } from 'grid-engine'
import 'phaser'
import { GameScene } from './gameScreen'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello IIT Bhilai students!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Starfall",
  width: '100%',
  height: 600,
  parent: "game",
  backgroundColor: "#18216D",
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },

  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
};

export class VirtualCampus extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new VirtualCampus(gameConfig);
};


// function preload() {
//   this.load.image("tiles", "assets/cloud_tileset.png");
//   this.load.tilemapTiledJSON("cloud-city-map", "assets/cloud_city.json");
//   this.load.spritesheet("player", "assets/characters.png", {
//     frameWidth: 52,
//     frameHeight: 72,
//   });
// }

// function create() {
//   const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });
//   cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
//   for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
//     const layer = cloudCityTilemap.createLayer(i, "Cloud City", 0, 0);
//     layer.scale = 3;
//   }
//   const playerSprite = this.add.sprite(0, 0, "player");
//   playerSprite.scale = 1.5;
//   this.cameras.main.startFollow(playerSprite, true);
//   this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);

//   const gridEngineConfig = {
//     characters: [
//       {
//         id: "player",
//         sprite: playerSprite,
//         walkingAnimationMapping: 6,
//         startPosition: { x: 8, y: 8 },
//       },
//     ],
//   };

//   this.gridEngine.create(cloudCityTilemap, gridEngineConfig);
// }

// function update() {
//   const cursors = this.input.keyboard.createCursorKeys();
//   if (cursors.left.isDown) {
//     this.gridEngine.move("player", "left");
//   } else if (cursors.right.isDown) {
//     this.gridEngine.move("player", "right");
//   } else if (cursors.up.isDown) {
//     this.gridEngine.move("player", "up");
//   } else if (cursors.down.isDown) {
//     this.gridEngine.move("player", "down");
//   }
// }