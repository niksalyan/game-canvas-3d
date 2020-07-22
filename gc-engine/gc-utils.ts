import {THREE, Vector3} from "./THREE";

export class Time {
    public static clock = new THREE.Clock();
    public static deltaTime: number = 0.01;
    public static timeScale: number = 1;

    public static elapsedTime: number = 0;

    public static fpsExact: number = 30;
    public static fpsSmooth: number = 30;
    public static fps: number = 30;

    public static Update() {
        let delta = Time.clock.getDelta();
        Time.elapsedTime = Time.clock.elapsedTime
        Time.deltaTime = THREE.Math.clamp(delta * Time.timeScale, 0, 0.1);
        Time.fpsExact = (1 / (delta || 0.005)) || 0;
        Time.fpsSmooth = Time.fpsSmooth + (Time.fpsExact - Time.fpsSmooth) * 0.015;
        Time.fps = Math.round(Time.fpsSmooth);
    }
}

export class SmoothDamp {

    private currentVelocity = 0;
    public maxSpeed = 1;

    constructor(public value = 0, public target = 0, public time = 0.1) {

    }

    public Update() {
        this.value += (this.target - this.value) * (1 / this.time) * Time.deltaTime;
    }
}

export class DegRadMap {

    private deg2rad: number = THREE.Math.DEG2RAD;
    private rad2deg: number = THREE.Math.RAD2DEG;

    constructor(private obj) {

    }

    public get x(): number {
        return this.obj.rotation.x * this.rad2deg;
    }

    public get y(): number {
        return this.obj.rotation.y * this.rad2deg;
    }

    public get z(): number {
        return this.obj.rotation.z * this.rad2deg;
    }

    public set x(x: number) {
        this.obj.rotation.x = x * this.deg2rad;
    }

    public set y(y: number) {
        this.obj.rotation.y = y * this.deg2rad;
    }

    public set z(z: number) {
        this.obj.rotation.z = z * this.deg2rad;
    }

    public set(x: number, y: number, z: number) {
        this.obj.rotation.set(x * this.deg2rad, y * this.deg2rad, z * this.deg2rad);
    }

    public rotate(x: number, y: number, z: number) {
        this.obj.rotateX(x * this.deg2rad);
        this.obj.rotateY(y * this.deg2rad);
        this.obj.rotateZ(z * this.deg2rad);
    }

    public rotateX(x: number) {
        this.obj.rotateX(x * this.deg2rad);
    }

    public rotateY(y: number) {
        this.obj.rotateY(y * this.deg2rad);
    }

    public rotateZ(z: number) {
        this.obj.rotateZ(z * this.deg2rad);
    }

}

export class Collision {

    public radius: number = 0.5;
    public size: Vector3 = new THREE.Vector3(1, 1, 1);

    constructor(private obj) {

    }

    public sphere(target) {
        return this.obj.position.distanceTo(target.position) - this.obj.collision.radius - target.collision.radius < 0;
    }

    public box(target) {
        return Math.abs(this.obj.position.x - target.position.x) - this.obj.collision.size.x / 2 - target.collision.size.x / 2 < 0 &&
            Math.abs(this.obj.position.y - target.position.y) - this.obj.collision.size.y / 2 - target.collision.size.y / 2 < 0 &&
            Math.abs(this.obj.position.z - target.position.z) - this.obj.collision.size.z / 2 - target.collision.size.z / 2 < 0;
    }
}

export class Utils {
    public static applyTexture(obj, texture) {
        let material = new THREE.MeshBasicMaterial({ map: texture });
        obj.traverse((node) => {
            if (node.geometry) {
                node.material = material;
            }
        });
    }
}