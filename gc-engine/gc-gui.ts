declare const THREE;

class GuiObject extends THREE.Object3D {

    public alpha: number = 1;

    constructor() {
        super();
        this.userData.gui = {};
        this.Init();
    }
    
    public Init () {

    }

    public Destroy () {
        this.userData.toDestroy = true;
    }

    public get angle (): number {
        return this.rotation.z;
    }

    public set angle (angle: number) {
        this.rotation.z = angle;
    }

    public get angleDeg (): number {
        return this.rotation.z * THREE.Math.RAD2DEG;
    }

    public set angleDeg (angleDeg: number) {
        this.rotation.z = angleDeg * THREE.Math.DEG2RAD;
    }

    public get gui() {
        return this.userData.gui;
    }

    public OnGui (gui) {
        for (const prop of Object.getOwnPropertyNames(this.userData.gui)) {
            gui[prop] = this.userData.gui[prop];
        }
    }
}

class GuiText extends GuiObject{

    public text = '';
    public lineHeight: number = 30;

    constructor() {
        super();
        this.gui.font = '20px Impact';
        this.gui.textAlign = 'start';
        this.gui.textBaseline = 'top';
        this.gui.fillStyle = '#ffffff99';
    }

    OnGui (gui) {
        super.OnGui(gui);
        const text = this.text.split('\n');
        for (let i = 0; i < text.length; i++) {
            gui.fillText(text[i], 0, i * this.lineHeight);
        }
    }
}