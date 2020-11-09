import {Scene} from "./Scene";

export class Rocket extends Phaser.GameObjects.Image {
    incX: number;
    incY: number;
    lifespan: number;
    speed: number;

    constructor(scene: Scene)
    {
        super(scene, 0, 0, 'rocket');

        this.displayHeight = 7;
        this.displayWidth = 15;
        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(400, 1);
    }

    static load(scene: Scene) 
    {
        scene.load.image({
            key: 'rocket', 
            url: 'assets/rockets.png',
        });        
    }

    activate(x1: number, y1: number, x2: number, y2:number)
    {
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x1, y1);

        var angle = Phaser.Math.Angle.Between(x2, y2, x1, y1);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 2000;        
    }

    update(time: number, delta: number)
    {
        this.lifespan -= delta;

        this.x -= this.incX * (this.speed * delta);
        this.y -= this.incY * (this.speed * delta);

        if (this.lifespan <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
