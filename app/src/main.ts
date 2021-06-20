import './style.css'

import { GridEngine } from 'grid-engine'
import 'phaser'
import { CampusScreen } from './screens/campusScreen';

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello IIT Bhilai students!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "GridEngineExample",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
  scale: {
    width: 720,
    height: 528,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [CampusScreen],
  parent: "game",
  backgroundColor: "#48C4F8",

};

export class VirtualCampus extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new VirtualCampus(gameConfig);
};