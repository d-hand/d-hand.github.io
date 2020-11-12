import { RocketGun } from "./RocketGun";
import { Scene } from "./Scene";

export class MandalorianWeapons {
    scene: Scene; 
    isAttack: boolean;
    huj = false;

    constructor(scene: Scene) {
        this.scene = scene;

        scene.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: any) => {
            this.isAttack = true;
        });

        scene.input.on(Phaser.Input.Events.POINTER_UP, () => {
            this.isAttack = false;
        });

        scene.input.keyboard.addKey('Q').on(Phaser.Input.Keyboard.Events.DOWN, () => {
            this.huj = !this.huj;
        });        

    }

    update(time: number, delta: number) {
        if (this.isAttack) {
            this.activate(time, this.scene.mandalorianSprite.x, this.scene.mandalorianSprite.y, this.scene.mouseX, this.scene.mouseY);
        }
    }

    activate(time: number, x1: number, y1: number, x2: number, y2: number) {
        if (this.huj)
            this.scene.rocketGun.activate(time, x1, y1, x2, y2);
        else
            this.scene.pistol.activate(time, x1, y1, x2, y2);
    }
}


