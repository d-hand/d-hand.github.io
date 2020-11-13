import { Scene } from "./Scene";

export class Rocket extends Phaser.GameObjects.Image {
    incX: number;
    incY: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    speed: number;
    boomSprite: Phaser.GameObjects.Sprite;

    constructor(scene: Scene) {
        super(scene, 0, 0, RocketFactory.rocketImage);

        this.displayHeight = 7;
        this.displayWidth = 15;
        this.incX = 0;
        this.incY = 0;
        this.speed = Phaser.Math.GetSpeed(400, 1);

    }

    activate(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x1, y1);

        var angle = Phaser.Math.Angle.Between(x2, y2, x1, y1);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);
    }

    update(time: number, delta: number) {

        this.x -= this.incX * (this.speed * delta);
        this.y -= this.incY * (this.speed * delta);

        if (Math.abs(this.x2 - this.x1) - Math.abs(this.x - this.x1) < 0 ||
            Math.abs(this.y2 - this.y1) - Math.abs(this.y - this.y1) < 0) {
            this.setActive(false);
            this.setVisible(false);
            
            const explosionSprite = this.scene.add.sprite(this.x, this.y, RocketFactory.boomImage);            
            explosionSprite.setScale(10)
            explosionSprite.play(RocketFactory.explodeKey);
            explosionSprite.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => explosionSprite.destroy());
            
            this.destroy();

            console.log('destroy');
        }
    }
}

export class RocketFactory {
    static readonly rocketImage = 'rocket';
    static readonly boomImage = 'boom';
    static readonly explodeKey = 'explode'

    static load(scene: Scene) {
        scene.load.image({
            key: RocketFactory.rocketImage,
            url: 'assets/rocket.png',
        });

        scene.load.spritesheet(RocketFactory.boomImage, 'assets/rocket-explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    }

    static addAnimationToScene(scene: Scene) {
        var result = scene.anims.create({
            key: RocketFactory.explodeKey,
            frames: scene.anims.generateFrameNames(RocketFactory.boomImage),
            hideOnComplete: true,
        });

        if (result === false)
            throw new Error();

        return result;
    }
}

