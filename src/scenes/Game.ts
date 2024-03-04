import Phaser from 'phaser'
import Email from '../core/Email'
import Lives from '../core/Lives'
import { Constants, EmailData } from '../utils/Constants'
import { UIValueBar } from '../core/UIValueBar'
import { Popup } from '../core/Popup'

// Create Game Class
export default class Game extends Phaser.Scene {
  // Class Variables
  public email: Email
  public lives: Lives
  public emailData: EmailData[] = Constants.LEVEL_ONE_EMAILS
  public currEmailIndex = 0

  public progressMeter: UIValueBar
  public difficultyLevel: number = 0
  public diffLevelText: Phaser.GameObjects.Text
  public feedbackPopup: Popup
  public isDisplayingPopup: boolean = false

  // Accept & Deny buttons
  public acceptButton: Phaser.GameObjects.Text
  public denyButton: Phaser.GameObjects.Text
  public scoreText: Phaser.GameObjects.Text

  // Required unique key. Otherwise an error is thrown.
  constructor() {
    super({ key: 'Game' })
  }

  create() {
    // Create Email Object
    this.email = new Email(this, this.emailData[this.currEmailIndex])

    // Create Lives Object
    this.lives = new Lives(this)

    // Create progress meter
    this.diffLevelText = this.add.text(
      25,
      30,
      `Level ${this.difficultyLevel + 1}`
    )
    this.progressMeter = new UIValueBar(this, {
      x: this.diffLevelText.x + this.diffLevelText.displayWidth + 15,
      y: 25,
      width: 300,
      fillColor: 0x50c878,
      bgColor: 0x444444,
      maxValue: 5,
      height: 25,
      borderWidth: 0,
    })
    this.progressMeter.setCurrValue(0)

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

    // Add accept & deny buttons
    this.acceptButton
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        const currEmailData = this.emailData[this.currEmailIndex]
        this.handleEmailSelection(currEmailData.isReal)
      })

    this.denyButton
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        const currEmailData = this.emailData[this.currEmailIndex]
        this.handleEmailSelection(!currEmailData.isReal)
      })

    this.feedbackPopup = new Popup(this)
  }

  handleEmailSelection(isCorrect: boolean) {
    console.log(this.isDisplayingPopup)
    if (this.isDisplayingPopup) {
      return
    }
    this.isDisplayingPopup = true
    this.feedbackPopup.showText(
      isCorrect ? 'Correct!' : 'Incorrect!',
      1000,
      () => {
        if (isCorrect) {
          this.progressMeter.increase(1)
          if (this.progressMeter.currValue == this.progressMeter.maxValue) {
            this.feedbackPopup.showText(
              `Level up!\nYou are now level ${this.difficultyLevel + 2}`,
              2000,
              () => {
                this.handleLevelUp()
                this.isDisplayingPopup = false
              }
            )
            return
          }
        } else {
          this.lives.decrementLife()

          // Check if this dude is headed to the Shadow Realm
          if (this.lives.numLives == 0) {
            this.sendPlayerToShadowRealm()
            return
          }
        }
        // Go to the next email
        this.currEmailIndex = (this.currEmailIndex + 1) % this.emailData.length
        this.email.setNewEmail(this.emailData[this.currEmailIndex])
        this.isDisplayingPopup = false
      }
    )
  }

  handleLevelUp() {
    this.progressMeter.currValue = 0
    this.difficultyLevel++
    this.progressMeter.setMaxValue(
      Constants.BASE_EXP * Math.pow(2, this.difficultyLevel)
    )
    this.emailData =
      Constants.ALL_EMAILS[this.difficultyLevel % Constants.ALL_EMAILS.length]
    this.currEmailIndex = 0
    this.email.setNewEmail(this.emailData[this.currEmailIndex])

    this.diffLevelText.setText(`Level: ${this.difficultyLevel + 1}`)
    this.progressMeter.x =
      this.diffLevelText.x + this.diffLevelText.displayWidth + 15
    this.progressMeter.draw()
  }

  sendPlayerToShadowRealm() {
    // Reset
    this.difficultyLevel = 0
    this.progressMeter.setMaxValue(0)
    this.progressMeter.setCurrValue(0)
    this.currEmailIndex = 0
    this.scene.start('ShadowRealm')
  }
}
