import Game from '../scenes/Game'
import { Constants } from '../utils/Constants'

export default class Lives {
  // Variables
  public numLives: integer
  public livesDisplay: Phaser.GameObjects.Text
  public heartImage: Phaser.GameObjects.Image
  public game: Game

  // Constructor
  constructor(game: Game) {
    this.game = game
    this.numLives = Constants.NUM_LIVES
    this.livesDisplay = this.game.add
      .text(Constants.WINDOW_WIDTH - 25, 25, `Lives: ${this.numLives}`)
      .setOrigin(1, 0)
  }

  decrementLife() {
    this.numLives = this.numLives - 1
    this.livesDisplay.setText(`Lives: ${this.numLives}`)
  }
}
