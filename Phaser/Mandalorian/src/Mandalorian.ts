import { MandalorianWeapons } from "./MandalorianWeapons";
import { Scene } from "./Scene";

interface IProps {
    scene: Scene;
    weapons: MandalorianWeapons;
}

interface ICtorProps extends IProps {    
    sprite: Phaser.GameObjects.Sprite;    
}

export class Mandalorian {
    static readonly spriteName = 'mandalorianSprite'

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

    private constructor({scene, sprite, weapons} : ICtorProps) {
        this.sprite = sprite;
        this.weapons = weapons;
        
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

    public static load(scene: Scene) {
        scene.load.image(Mandalorian.spriteName, 'assets/mandalorian.png');
    }

    public static addToScene(props: IProps) : Mandalorian {        
        const sprite = props.scene.add.sprite(400, 300, Mandalorian.spriteName).setDepth(1);
        return new Mandalorian({...props, sprite});
    }

    public update(time: number, delta: number) {
        if (this.isAttack) {
            this.weapons.activate(time, this.sprite.x, this.sprite.y, this.mouseX, this.mouseY);
        }

        this.sprite.x += delta * this.speed * (Number(this.keyD.isDown) - Number(this.keyA.isDown));
        this.sprite.y += delta * this.speed * (Number(this.keyS.isDown) - Number(this.keyW.isDown));

        this.sprite.setRotation(Phaser.Math.Angle.Between(this.mouseX, this.mouseY, this.sprite.x, this.sprite.y) - Math.PI / 2);
    }
}