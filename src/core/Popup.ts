import Game from '../scenes/Game'
import { Constants } from '../utils/Constants'

export class Popup {
  private popupText: Phaser.GameObjects.Text
  private popupRect: Phaser.GameObjects.Rectangle
  private game: Game

  constructor(game: Game) {
    this.game = game
    this.popupRect = this.game.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2,
        225,
        100,
        0x111111
      )
      .setStrokeStyle(1, 0xffffff)
      .setVisible(false)
    this.popupText = this.game.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, '')
      .setVisible(false)
      .setOrigin(0.5, 0.5)
      .setAlign('center')
  }

  showText(text: string, duration: number, completeCallback: Function) {
    this.popupText.setText(text).setVisible(true)
    this.popupRect.setVisible(true)
    this.game.time.delayedCall(duration, () => {
      this.popupText.setVisible(false)
      this.popupRect.setVisible(false)
      completeCallback()
    })
  }
}
