import {Object3D} from "../gc-engine/gc-objects";
import {Loader} from "../gc-engine/gc-loader";
import {Time} from "../gc-engine/gc-utils";
import {THREE} from "../gc-engine/THREE";

export class LevelBlock extends Object3D {
    OnLoad() {
        return Loader.models['level-block-' + THREE.Math.randInt(1, 2)].clone();
    }

    Start() {
        
        this.position.x = 120;
        this.position.y = -18;
        this.position.z = -38;

        this.scale.x = 9;
        this.scale.z = 9;
        this.scale.y = 9;

        this.rotationDeg.y = 0;
    }

    Update() {

        this.position.x -= Time.deltaTime * 10;

        if (this.position.x < -120) {
            this.Destroy();
        }


    }
}