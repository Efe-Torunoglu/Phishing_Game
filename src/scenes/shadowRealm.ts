import Phaser from 'phaser'

export default class shadowRealm extends Phaser.Scene {

    public gameOverText: Phaser.GameObjects.Text
    public newGameButton: Phaser.GameObjects.Text

    // Required unique key. Otherwise an error is thrown. 
    constructor ()
    {
        super({ key: 'shadowRealm' });
    }

    create(){

        this.gameOverText = this.add.text(100,100,"GAME OVER")
        this.newGameButton = this.add.text(100,150, "NEW GAME?")
        
        // Game Button Creates New Game
        this.newGameButton
        .setInteractive({ useHandCursor: true })
        .on(Phaser.Input.Events.POINTER_UP, () => {
            this.scene.start('Game');
        })
    }
    
}
