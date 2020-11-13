import { MandalorianWeapons } from "./MandalorianWeapons";
import { Scene } from "./Scene";

export class Mandalorian {
    scene: Scene;    

    up: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    bottom: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;

    speed = Phaser.Math.GetSpeed(100, 1);

    constructor(scene: Scene) {
        this.scene = scene;

        // this.up = scene.input.keyboard.addKey('E');
        // this.left = scene.input.keyboard.addKey('S');
        // this.bottom = scene.input.keyboard.addKey('D');
        // this.right = scene.input.keyboard.addKey('F');
        this.up = scene.input.keyboard.addKey('up');
        this.left = scene.input.keyboard.addKey('left');
        this.bottom = scene.input.keyboard.addKey('down');
        this.right = scene.input.keyboard.addKey('right');
    }

    update(time: number, delta: number) {
        const sprite = this.scene.mandalorianSprite;

        sprite.x += delta * this.speed * (Number(this.right.isDown) - Number(this.left.isDown));
        sprite.y += delta * this.speed * (Number(this.bottom.isDown) - Number(this.up.isDown));

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