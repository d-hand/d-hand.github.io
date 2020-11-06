import {Bullet} from './Bullet';

export default class Scene extends Phaser.Scene {
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
