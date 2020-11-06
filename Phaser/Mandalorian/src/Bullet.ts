export class Bullet extends Phaser.GameObjects.Image {
    incX: number;
    incY: number;
    lifespan: number;
    speed: number;

    constructor(scene: Phaser.Scene)
    {
        super(scene, 0, 0, 'bullets');

        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(600, 1);
    }

    fire (fromX: number, fromY: number, toX: number, toY:number)
    {
        this.setActive(true);
        this.setVisible(true);

        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(fromX, fromY);

        var angle = Phaser.Math.Angle.Between(toX, toY, fromX, fromY);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 1000;
    }

    update(time: any, delta: any)
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
