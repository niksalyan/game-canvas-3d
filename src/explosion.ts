import {AnimatedSprite} from "../gc-engine/gc-objects";
import {Loader} from "../gc-engine/gc-loader";
import {Time} from "../gc-engine/gc-utils";
import {THREE} from "../gc-engine/THREE";

export class Explosion extends AnimatedSprite {
    constructor(position){
        super(Loader.textures.explosion, 5, 5);
        this.position.set(
            position.x + THREE.Math.randFloatSpread(2),
            position.y + THREE.Math.randFloatSpread(2), 
            position.z + THREE.Math.randFloatSpread(2)
            );
    }

    Init () {

        let size = THREE.Math.randFloat(0, 4);

        this.scale.set(size,size,size);
        
        this.attr.moveX = THREE.Math.randFloatSpread(20);
        this.attr.moveY = THREE.Math.randFloatSpread(20);
        this.attr.moveZ = THREE.Math.randFloatSpread(20);

        this.material.rotation = Math.random() * Math.PI * 2;

        this.frame = THREE.Math.randFloat(0, 10);

        

    }

    Update () {
        this.frame += Time.deltaTime * 40;
        this.position.x += Time.deltaTime * this.attr.moveX;
        this.position.y += Time.deltaTime * this.attr.moveY;
        this.position.z += Time.deltaTime * this.attr.moveZ;

        this.material.opacity = THREE.Math.clamp(1 - (this.frame / 25), 0, 1);

        if (this.frame >= 25) {
            this.Destroy();
        }
        
    }
}