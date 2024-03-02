import Phaser from 'phaser'
import Game from './src/scenes/Game'
import { Constants } from './src/utils/Constants'

const config = {
  width: Constants.WINDOW_WIDTH,
  height: Constants.WINDOW_HEIGHT,
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [Game],
}

new Phaser.Game(config)