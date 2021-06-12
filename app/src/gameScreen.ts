import "phaser";

export class GameScene extends Phaser.Scene {
    delta: number = 1000;
    lastStarTime: number = 0;
    starsCaught: number = 0;
    starsFallen: number = 0;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "GameScene"
        })
    }

    init(/*params: any*/) : void {
        // this.delta = 1000;
        // this.lastStarTime = 0;
        // this.starsCaught = 0;
        // this.starsFallen = 0;
    }

    preload(/*params : any*/) : void {
        this.load.setBaseURL(
            "https://raw.githubusercontent.com/mariyadavydova/" +
            "starfall-phaser3-typescript/master/");
        this.load.image("star", "assets/star.png");
        this.load.image("sand", "assets/sand.jpg");      
    }

    create(params : any) : void {
        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: 20
        });
        Phaser.Actions.PlaceOnLine(
            this.sand.getChildren(),
            new Phaser.Geom.Line(20, 580, 820, 580),
        );
        this.sand.refresh();

        this.info = this.add.text(10,10, 'Some message here', {
            font: '24px Arial Bold', color: '#FBFBAC',
        });
        
    }

    update(params: any): void {
        // TODO
    }
}