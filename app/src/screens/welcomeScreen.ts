import "phaser";

export class WelcomeScreen extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'WelcomeScene'
        });
    }

    create(): void {
        const titleText: string = "Starfall";
        this.title = this.add.text(150, 200, titleText,
            { font: '128 px Arial Bold', color: '#FBFBAC' }
        );
        const hintText: string = "Click here to start";
        this.hint = this.add.text(300, 350, hintText, 
            {font: '24px Arial Bold', color: '#FBFBAC'}
        );
        this.input.on('pointerdown', () => {
            this.scene.start("GameScene");
        }, this);
    }
}