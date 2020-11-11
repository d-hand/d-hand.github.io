import { Scene } from "./Scene";

export class Rocket extends Phaser.GameObjects.Image {
    incX: number;
    incY: number;
    lifespan: number;
    speed: number;
    boomSprite: Phaser.GameObjects.Sprite;

    constructor(scene: Scene) {
        super(scene, 0, 0, 'rocket');

        this.displayHeight = 7;
        this.displayWidth = 15;
        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(400, 1);

        scene.anims.create({
            key: 'explode',
            frames: scene.anims.generateFrameNames('boom'),
            hideOnComplete: true
        });
    }

    static load(scene: Scene) {
        scene.load.image({
            key: 'rocket',
            url: 'assets/rockets.png',
        });

        scene.load.spritesheet('boom', 'assets/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    }

    activate(x1: number, y1: number, x2: number, y2: number) {
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x1, y1);

        var angle = Phaser.Math.Angle.Between(x2, y2, x1, y1);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 600;
    }

    update(time: number, delta: number) {
        this.lifespan -= delta;

        this.x -= this.incX * (this.speed * delta);
        this.y -= this.incY * (this.speed * delta);

        if (this.lifespan <= 0) {
            this.setActive(false);
            this.setVisible(false);
            
            debugger;
            console.log(this)
            this.scene.add.sprite(this.x, this.y, 'boom').play('explode');
            this.destroy();
        }
    }
}
