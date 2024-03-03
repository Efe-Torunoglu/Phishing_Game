import Game from '../scenes/Game'
import { EmailData } from '../utils/Constants'

export default class Email {
  // Variables
  public fromText: Phaser.GameObjects.Text
  public toText: Phaser.GameObjects.Text
  public bodyText: Phaser.GameObjects.Text
  public subjectLine: Phaser.GameObjects.Text
  public game: Game

  // Initializes Email Object
  constructor(game: Game, emailData: EmailData) {
    this.game = game
    this.fromText = this.game.add.text(100, 100, `From: ${emailData.from}`)
    this.toText = this.game.add.text(100, 150, `To: ${emailData.to}`)
    this.subjectLine = this.game.add.text(
      100,
      200,
      `SUBJECT: ${emailData.subjectLine}`
    )
    this.bodyText = this.game.add.text(100, 250, emailData.body)
  }

  // Setter Method
  setNewEmail(emailData: EmailData) {
    this.fromText.setText(`From: ${emailData.from}`)
    this.toText.setText(`To: ${emailData.to}`)
    this.subjectLine.setText(`Subject: ${emailData.subjectLine}`)
    this.bodyText.setText(`Body: ${emailData.body}`)
  }
}
