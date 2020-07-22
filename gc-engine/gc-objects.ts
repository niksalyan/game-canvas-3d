declare const THREE, Engine, DegRadMap, Collision;

class Object3D extends THREE.Object3D {

    public tag: string;

    public rotationDeg = new DegRadMap(this);
    public collision = new Collision(this);
    private _audio;

    constructor(obj = null) {
        super();
        this.SetObject(obj);
        this.SetObject(this.Init());
    }

    public Init () {

    }

    public Destroy () {
        this.userData.toDestroy = true;
    }

    public SetObject (obj) {
        if (obj) {
            for (let key in obj) {
                switch (key) {
                    case 'position':
                    case 'rotation':
                    case 'scale':
                    case 'tag':
                    case 'name':
                    case 'add':
                    case 'remove':
                    case 'onBeforeRender':
                        break;
                    default:
                        this[key] = obj[key];
                }
                
            }
        }
    }

    public SetController (key, controller) {
        this.userData.controllers = this.userData.controllers || {};
        let props = key.split('.');
        if (props.length > 1) {
            controller.obj = this[props[0]];
            controller.prop = props[1];
        } else {
            controller.obj = this;
            controller.prop = props[0];
        }
        this.userData.controllers[key] = controller;
    }

    public get attr() {
        return this.userData;
    }

    public get list () {
        this.userData.list = this.userData.list || [];
        return this.userData.list;
    }

    public add (obj) {
        super.add(obj);
        if (obj && obj.tag) {
            this.list[obj.tag] = this.list[obj.tag] || [];
            this.list[obj.tag].push(obj);
        }
    }

    public remove (obj) {
        super.remove(obj);
        if (obj && obj.tag && this.list[obj.tag]) {
            const index = this.list[obj.tag].indexOf(obj);
            if (index > -1) {
                this.list[obj.tag].splice(index, 1);
            }
        }
    }

    public get audio () {
        if (!this._audio) {
            this._audio = new THREE.PositionalAudio( Engine.listener );
            this.add(this._audio);
        }
        return this._audio;
    }

}

class AnimatedSprite extends Object3D {

    public frame: number = 0;
    
    public tileX: number;
    public tileY: number;

    constructor(texture, tileX: number, tileY: number) {
        super(new THREE.Sprite(new THREE.SpriteMaterial( { map: texture } )));
        this.tileX = tileX;
        this.tileY = tileY;
    }

    onBeforeRender () {
        this.material.map.repeat.x = 1 / this.tileX;
        this.material.map.repeat.y = 1 / this.tileY;

        let frame = Math.round(this.frame);
        let fx: number = 1 / this.tileX * (frame % this.tileX);
        let fy: number = 1 - 1 / this.tileY - (1 / this.tileY * Math.floor((frame / this.tileX)));

        this.material.map.offset.x = fx;
        this.material.map.offset.y = fy;
    }

}

class Scene extends Object3D {
    constructor() {
        super(new THREE.Scene());
        this.camera = new THREE.PerspectiveCamera(
            50,
            Engine.aspect,
            0.1,
            1000
        );
        this.camera.rotationDeg = new DegRadMap(this.attr.camera);
        this.camera.add( Engine.listener );
    }
}