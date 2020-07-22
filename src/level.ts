import {Load, Loader} from "../gc-engine/gc-loader";
import {Scene} from "../gc-engine/gc-objects";
import {THREE} from "../gc-engine/THREE";
import {MainPlayer} from "./main-player";
import {GuiText} from "../gc-engine/gc-gui";
import {Time} from "../gc-engine/gc-utils";
import {Enemy} from "./enemy";
import {Input} from "../gc-engine/gc-input";
import {Engine} from "../gc-engine/gc-engine";
import {LevelBlock} from "./level-block";

@Load({
    path: 'res/models',
    resources: [
        'SpaceShip',
        'bullet',
        'level-block-1',
        'level-block-2',
        'asteroid',
        'explosion.png',
    ]
})
@Load({
    path: 'res/sounds',
    resources: [
        'shoot.ogg'

    ]
})
export class Level extends Scene {

    constructor() {
        super();

        this.camera.position.z = 100;
        this.camera.near = 95;
        this.camera.far = 500;


        this.camera.fov = 20;
        this.camera.updateProjectionMatrix();

        this.add(new LevelBlock());

        var light = new THREE.PointLight(0xffffff, 0.5, 500);
        light.position.set(0, 0, 10);
        this.add(light);

        this.add(new MainPlayer());

        this.attr.blockTimer = 0;
        this.attr.enemyTimer = 0;


        Engine.prewarm = 15;

        this.attr.paused = false;
        this.attr.matrix = false;

        this.attr.guiText = new GuiText();
        this.attr.guiText.position.x = 10;
        this.attr.guiText.position.y = 50;
        this.add(this.attr.guiText);

        this.attr.score = 0;

    }

    Start() {
        Engine.audio.setBuffer(Loader.sounds.music);
    }

    Update() {
        this.attr.blockTimer += Time.deltaTime;
        if (this.attr.blockTimer >= 10.7) {
            this.add(new LevelBlock());
            this.attr.blockTimer = 0;
        }

        this.attr.enemyTimer += Time.deltaTime;
        if (this.attr.enemyTimer > 0.5) {
            this.add(new Enemy());
            this.attr.enemyTimer = 0;
        }

        if (Input.click.KeyP) {
            this.attr.paused = !this.attr.paused;
            Time.timeScale = this.attr.paused ? 0 : 1;
        }

        if (Input.click.KeyM) {
            this.attr.matrix = !this.attr.matrix;
            Time.timeScale = this.attr.matrix ? 0.2 : 1;
        }

        this.attr.guiText.text = 'HEALTH: ' + '▓'.repeat(10) + '░'.repeat(5) + '\n\nSCORE: ' + (this.attr.score + 100000000).toString().substr(1) + '\nFPS: ' + Time.fps + (this.attr.paused ? '\nPAUSED' : '') + '\n\nCONTROLS: WASD ⇦ ⇨ ⇧ ⇩\nFIRE: Numpad0 ⇧ ꌷ';

    }

    OnGui (gui) {
        if (this.attr.paused) {
            gui.fillStyle = 'rgba(0,0,0,0.5)';
            gui.fillRect(0, 0, Engine.width, Engine.height);
        }
    }

}