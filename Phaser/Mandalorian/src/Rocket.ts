import { Scene } from "./Scene";

export class Rocket extends Phaser.GameObjects.Image {
    static readonly rocketImage = 'rocket';
    static readonly boomImage = 'boom';
    static readonly explodeKey = 'explode'

    incX: number;
    incY: number;
    lifespan: number;
    speed: number;
    boomSprite: Phaser.GameObjects.Sprite;

    constructor(scene: Scene) {
        super(scene, 0, 0, Rocket.rocketImage);

        this.displayHeight = 7;
        this.displayWidth = 15;
        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(400, 1);

    }

    static load(scene: Scene) {
        scene.load.image({
            key: Rocket.rocketImage,
            url: 'assets/rocket.png',
        });

        scene.load.spritesheet(Rocket.boomImage, 'assets/rocket-explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    }

    static addToScene({scene}: {scene: Scene}) {
        scene.anims.create({
            key: Rocket.explodeKey,
            frames: scene.anims.generateFrameNames(Rocket.boomImage),
            hideOnComplete: true
        });
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
            
            const explosionSprite = this.scene.add.sprite(this.x, this.y, Rocket.boomImage);
            explosionSprite.play(Rocket.explodeKey);
            explosionSprite.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => explosionSprite.destroy());
            
            this.destroy();

            console.log('destroy');
        }
    }
}
