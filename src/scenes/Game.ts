import Email from '../core/Email'
import { Constants } from '../utils/Constants'


// Create Game Class 
export default class Game extends Phaser.Scene {

    // Class Variables
    public email: Email
    public nextButton: Phaser.GameObjects.Text
    
    create() {

        // Shuffle Emails and Initialize Index
        const emailData = Phaser.Utils.Array.Shuffle(Constants.RAW_EMAIL_DATA)
        let index = 0
        
        // Create Email Object
        this.email = new Email(this, emailData[index])
        
        // Create Button
        this.nextButton = this.add.text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT - 100, 'Next')

        // Button Interactivity
        this.nextButton.setInteractive({ useHandCursor: true}).on(Phaser.Input.Events.POINTER_UP, () => {

            // Mod to make sure we dont go out of bounds, update index and point to next email. 
            index = (index + 1) % emailData.length
            this.email.setNewEmail(emailData[index])

        })
    }
}