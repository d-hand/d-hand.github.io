import { MandalorianWeapons } from "./MandalorianWeapons";
import { Scene } from "./Scene";

export class Mandalorian {
    scene: Scene;    

    keyW: Phaser.Input.Keyboard.Key;
    keyA: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;

    speed = Phaser.Math.GetSpeed(100, 1);

    constructor(scene: Scene) {
        this.scene = scene;

        this.keyW = scene.input.keyboard.addKey('W');
        this.keyA = scene.input.keyboard.addKey('A');
        this.keyS = scene.input.keyboard.addKey('S');
        this.keyD = scene.input.keyboard.addKey('D');
    }

    update(time: number, delta: number) {
        const sprite = this.scene.mandalorianSprite;

        sprite.x += delta * this.speed * (Number(this.keyD.isDown) - Number(this.keyA.isDown));
        sprite.y += delta * this.speed * (Number(this.keyS.isDown) - Number(this.keyW.isDown));

        sprite.setRotation(Phaser.Math.Angle.Between(this.scene.mouseX, this.scene.mouseY, sprite.x, sprite.y) - Math.PI / 2);
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