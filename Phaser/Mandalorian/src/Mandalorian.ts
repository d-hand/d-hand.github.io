import { MandalorianWeapons } from "./MandalorianWeapons";
import { Scene } from "./Scene";

export class Mandalorian {
    sprite: Phaser.GameObjects.Sprite;
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
        this.sprite = scene.mandalorianSprite;
        this.weapons = scene.mandalorianWeapons;
        
        scene.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: any) => {
            this.isAttack = true;
        });

        scene.input.on(Phaser.Input.Events.POINTER_UP, () => {
            this.isAttack = false;
        });

        scene.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer: any) => {
            this.mouseX = pointer.x;
            this.mouseY = pointer.y;
            // console.log(this.mouseX, this.mouseY);
        });

        this.keyW = scene.input.keyboard.addKey('W');
        this.keyA = scene.input.keyboard.addKey('A');
        this.keyS = scene.input.keyboard.addKey('S');
        this.keyD = scene.input.keyboard.addKey('D');
    }

    update(time: number, delta: number) {
        if (this.isAttack) {
            this.weapons.activate(time, this.sprite.x, this.sprite.y, this.mouseX, this.mouseY);
        }

        this.sprite.x += delta * this.speed * (Number(this.keyD.isDown) - Number(this.keyA.isDown));
        this.sprite.y += delta * this.speed * (Number(this.keyS.isDown) - Number(this.keyW.isDown));

        this.sprite.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.sprite.x, this.sprite.y) - Math.PI / 2);
    }
}

export class MandalorianFactory {
    static readonly mandalorianSprite = 'mandalorianSprite'

    static load(scene: Scene) {
        scene.load.image(MandalorianFactory.mandalorianSprite, 'assets/mandalorian.png');
    }

    static addMandalorianSpriteToScene(scene: Scene)  {
        return scene.add.sprite(400, 300, MandalorianFactory.mandalorianSprite).setDepth(1);
    }
}