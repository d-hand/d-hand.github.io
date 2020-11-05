import 'phaser';

export default class MandalorianScene extends Phaser.Scene {
    bullets: Phaser.GameObjects.Group;
    mandalorian: Phaser.GameObjects.Sprite;
    isDown: boolean;
    mouseX = 0;
    mouseY = 0;
    lastFired = 0;

    constructor() {
        super('Mandalorian');
    }

    preload() {
        this.load.image('mandalorian', 'assets/mandalorian.png');
        this.load.image('bullets', 'assets/bullets.png');
    }

    create() {

        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        });

        this.mandalorian = this.add.sprite(400, 300, 'mandalorian').setDepth(1);

        this.input.on('pointerdown', (pointer) => {
            this.isDown = true;
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        });

        this.input.on('pointermove', (pointer) => {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        });

        this.input.on('pointerup', (pointer) => {
            this.isDown = false;
        });
    }

    update(time, delta) {

        if (this.isDown && time > this.lastFired) {
            var bullet = this.bullets.get();

            if (bullet) {
                bullet.fire(this.mouseX, this.mouseY);

                this.lastFired = time + 50;
            }
        }

        this.mandalorian.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.mandalorian.x, this.mandalorian.y) - Math.PI / 2);

    }
}

class Bullet extends Phaser.GameObjects.Image {
    incX: number;
    incY: number;
    lifespan: number;
    speed: number;

    constructor(scene: MandalorianScene)
    {
        super(scene, 0, 0, 'bullets');

        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(600, 1);
    }

    fire (x, y)
    {
        this.setActive(true);
        this.setVisible(true);

        //  Bullets fire from the middle of the screen to the given x/y
        this.setPosition(400, 300);

        var angle = Phaser.Math.Angle.Between(x, y, 400, 300);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 1000;
    }

    update(time, delta)
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

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: MandalorianScene
};

const game = new Phaser.Game(config);
