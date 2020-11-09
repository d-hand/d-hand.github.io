import { GameObjects } from "phaser";
import { MandalorianWeapons } from "./MandalorianWeapons";
import { Scene } from "./Scene";

export class Mandalorian extends Phaser.GameObjects.Sprite {
    weapons: MandalorianWeapons;

    isAttack: boolean;    

    mouseX = 0;
    mouseY = 0;
    
    keyW: Phaser.Input.Keyboard.Key;
    keyA: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;

    speed = Phaser.Math.GetSpeed(100, 1);    

    constructor(scene: Scene) {
        super(scene, 400, 300, 'mandalorian');
        this.setDepth(1);

        this.weapons = new MandalorianWeapons(scene);        

        scene.input.on('pointerdown', (pointer: any) => {
            this.isAttack = true;
        });

        scene.input.on('pointerup', () => {
            this.isAttack = false;
        });

        scene.input.on('pointermove', (pointer: any) => {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
        });

        this.keyW = scene.input.keyboard.addKey('W');
        this.keyA = scene.input.keyboard.addKey('A');
        this.keyS = scene.input.keyboard.addKey('S');
        this.keyD = scene.input.keyboard.addKey('D');
    }

    public static load(scene: Scene) {
        scene.load.image('mandalorian', 'assets/mandalorian.png');
        MandalorianWeapons.load(scene);
    }

    public addToScene(scene: Scene) {
        scene.add.existing(this);
        this.weapons.addToScene(scene);
    }

    public update(time: number, delta: number) {
        if (this.isAttack) {
            this.weapons.activate(time, this.x, this.y, this.mouseX, this.mouseY);
        }

        this.x += delta * this.speed * (Number(this.keyD.isDown) - Number(this.keyA.isDown));
        this.y += delta * this.speed * (Number(this.keyS.isDown) - Number(this.keyW.isDown));

        this.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.x, this.y) - Math.PI / 2);
    }
}