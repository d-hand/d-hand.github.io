import { GameObjects } from "phaser";
import { Bullet } from "./Bullet";

export class Mandalorian extends Phaser.GameObjects.Sprite {
    bullets: GameObjects.Group;
    isFire: boolean;
    isForward: boolean;
    mouseX = 0;
    mouseY = 0;
    lastFired = 0;
    step = 2;
    keyW: Phaser.Input.Keyboard.Key;
    keyA: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;

    
    constructor(scene: Phaser.Scene) {
        super(scene, 400, 300, 'mandalorian');
        this.setDepth(1);        
        scene.add.existing(this);

        this.bullets = scene.add.group({
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        });

        scene.input.on('pointerdown', (pointer: any) => {
            this.isFire = true;
            this.mouseX = pointer.x;
            this.mouseX = pointer.y;
        });

        scene.input.on('pointermove', (pointer: any) => {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        });

        scene.input.on('pointerup', () => {
            this.isFire = false;
        });

        this.keyW = scene.input.keyboard.addKey('W'); 
        this.keyA = scene.input.keyboard.addKey('A'); 
        this.keyS = scene.input.keyboard.addKey('S'); 
        this.keyD = scene.input.keyboard.addKey('D'); 
    }

    update(time, delta) {
        
        if (this.isFire && time > this.lastFired) {
            var bullet = this.bullets.get() as Bullet;

            if (bullet) {
                bullet.fire(this.x, this.y, this.mouseX, this.mouseY);

                this.lastFired = time + 50;
            }
        }

        let x = this.x;
        let y = this.y;
        if (this.keyW.isDown) {
            y -= this.step;
        }
        if (this.keyS.isDown) {
            y += this.step;
        }
        if (this.keyD.isDown) {
            x += this.step;
        }
        if (this.keyA.isDown) {
            x -= this.step;
        }
        this.setPosition(x, y);

        this.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.x, this.y) - Math.PI / 2);
    }
}