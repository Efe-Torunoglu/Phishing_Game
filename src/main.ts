import Phaser from 'phaser'
import Game from './scenes/Game'
import shadowRealm from './scenes/shadowRealm'
import { Constants } from './utils/Constants'

const config = {
  width: Constants.WINDOW_WIDTH,
  height: Constants.WINDOW_HEIGHT,
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [Game, shadowRealm],
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
}

new Phaser.Game(config)
