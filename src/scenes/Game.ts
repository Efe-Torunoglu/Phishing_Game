import Phaser from 'phaser'
import Email from '../core/Email'
import Lives from '../core/Lives'
import { Constants, EmailData } from '../utils/Constants'

// Create Game Class
export default class Game extends Phaser.Scene {
  
    // Class Variables
  public email: Email
  public lives: Lives
  public emailData: EmailData[] = Constants.RAW_EMAIL_DATA
  public currEmailIndex = 0
  public numCorrect = 0
  public numIncorrect = 0
  
  // Accept & Deny buttons
  public acceptButton: Phaser.GameObjects.Text
  public denyButton: Phaser.GameObjects.Text
  public scoreText: Phaser.GameObjects.Text

    // Required unique key. Otherwise an error is thrown. 
    constructor ()
    {
        super({ key: 'Game' });
    }
  

  create() {
    // Create Email Object
    this.email = new Email(this, this.emailData[this.currEmailIndex])
    
    // Create Lives Object
    this.lives = new Lives(this)

    // Create Button
    this.acceptButton = this.add
      .text(
        Constants.WINDOW_WIDTH / 2 - 100,
        Constants.WINDOW_HEIGHT - 100,
        'Accept'
      )
      .setOrigin(0, 0.5)
    this.denyButton = this.add
      .text(
        Constants.WINDOW_WIDTH / 2 + 100,
        Constants.WINDOW_HEIGHT - 100,
        'Deny'
      )
      .setOrigin(0, 0.5)

    this.scoreText = this.add.text(25, 25, 'Correct: 0\nIncorrect: 0')

    // Add accept & deny buttons
    this.acceptButton
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        const currEmailData = this.emailData[this.currEmailIndex]
        this.handleCorrectness(currEmailData.isReal)
      })

    this.denyButton
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        const currEmailData = this.emailData[this.currEmailIndex]
        this.handleCorrectness(!currEmailData.isReal)
      })
  }

  handleCorrectness(isCorrect: boolean) {
    if (isCorrect) {
      this.numCorrect++
    } else {
      this.numIncorrect++
      this.lives.decrementLife()
    
      // Check if this dude is headed to the Shadow Realm
      if(this.lives.numLives == 0){
        this.scene.start('shadowRealm');
      }

    }
    this.scoreText.setText(
      `Correct: ${this.numCorrect}\nIncorrect: ${this.numIncorrect}`
    )

    // Go to the next email
    this.currEmailIndex = (this.currEmailIndex + 1) % this.emailData.length
    this.email.setNewEmail(this.emailData[this.currEmailIndex])
  }


}