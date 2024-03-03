import Phaser from 'phaser'
import Game from './scenes/Game'
import { Constants } from './utils/Constants'

const config = {
  width: Constants.WINDOW_WIDTH,
  height: Constants.WINDOW_HEIGHT,
  pixelArt: true,
  type: Phaser.AUTO,
  scene: [Game],
}

new Phaser.Game(config)
