import {Loader} from "../gc-engine/gc-loader";
import {Time} from "../gc-engine/gc-utils";
import {Object3D} from "../gc-engine/gc-objects";
import {THREE} from "../gc-engine/THREE";
import {Explosion} from "./explosion";
import {Engine} from "../gc-engine/gc-engine";

export class Enemy extends Object3D {

    public tag = 'enemy';

    constructor() {
        super(Loader.models.asteroid.clone());
    }

    Init () {
        this.scale.x = 2;
        this.scale.y = 2;
        this.scale.z = 2;

        this.position.x = 33;
        this.position.y = THREE.Math.randFloatSpread(30);

        this.collision.radius = 2;

        this.attr.health = 3;

        this.material = this.material.clone();
        this.material.emissive = new THREE.Color( 0x995511 );
        this.material.emissiveIntensity = 0;

    }

    Update () {

        this.material.emissiveIntensity = 0;

        this.position.x -= Time.deltaTime * 10;

        this.rotationDeg.x += Time.deltaTime * 30;
        this.rotationDeg.y += Time.deltaTime * 90;
        this.rotationDeg.z += Time.deltaTime * 20;

        if (this.position.x < -33) {
            this.Destroy();
        }
    }

    applyDamage (damage) {
        this.material.emissiveIntensity = 1;
        this.attr.health -= damage;
        if (this.attr.health <= 0) {

            Engine.scene.attr.score += 100;

            this.Destroy();
            for (let i = 0; i < 100; i++) {
                Engine.scene.add(new Explosion(this.position));
            }
        }
    }

}