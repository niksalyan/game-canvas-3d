import {Time} from "./gc-utils";

export class Tween {
    private fase: number = 0;
    private speed: number;
    public value: number = 0;
    public completed: boolean = false;

    constructor(public from: number, public to: number, public duration: number = 1, public easing: any = Easing.Default, public delay: number = 0) {
        this.speed = 1 / duration;
        this.value = this.from;
        this.fase = 0 - this.delay * this.speed;
    }

    Update () {
        this.fase = this.fase + this.speed * Time.deltaTime;
        if (this.fase <= 0) {
            this.value = this.from;
        } else if (this.fase >= 1) {
            this.value = this.to;
            this.completed = true;
        } else {
            this.value = this.from + (this.to - this.from) * this.easing(this.fase, 0, 1, 1);
        }
    }
}

export class Smooth {

    public value: number;

    constructor (from: number, public target: number, public duration: number) {
        this.value = from;
    }

    Update () {
        this.value = this.value + (this.target - this.value) * this.duration * Time.deltaTime;
    }
}