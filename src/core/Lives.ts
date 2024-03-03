import Game from "../scenes/Game";
import { Constants } from '../utils/Constants'

export default class Lives {

  // Variables
    public numLives: integer
    public livesDisplay: Phaser.GameObjects.Text
    public heartImage: Phaser.GameObjects.Image
    public game: Game;

    // Constructor 
  constructor(game: Game) {
    this.game = game
    this.numLives = Constants.NUM_LIVES
    this.livesDisplay= this.game.add.text(25,60, `Lives: ${this.numLives}`)
  }

  decrementLife() {
    this.numLives = this.numLives-1
    this.livesDisplay.setText(`Lives: ${this.numLives}`)
  }
}
