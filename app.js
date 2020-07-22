var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("gc-engine/THREE", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.THREE = window['THREE'];
    ;
});
define("gc-engine/gc-input", ["require", "exports", "gc-engine/gc-engine"], function (require, exports, gc_engine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Input {
        static Init() {
            document.addEventListener('keydown', Input.keyEvent, false);
            document.addEventListener('keyup', Input.keyEvent, false);
            gc_engine_1.Engine.guiContainer.addEventListener('mousedown', Input.mouseEvent, false);
            gc_engine_1.Engine.guiContainer.addEventListener('mouseup', Input.mouseEvent, false);
            gc_engine_1.Engine.guiContainer.addEventListener('mouseover', Input.mouseEvent, false);
            gc_engine_1.Engine.guiContainer.addEventListener('mouseout', Input.mouseEvent, false);
            gc_engine_1.Engine.guiContainer.addEventListener('mousemove', Input.mouseEvent, false);
        }
        static get axisX() {
            return (Input.key.ArrowLeft || Input.key.KeyA ? -1 : 0) + (Input.key.ArrowRight || Input.key.KeyD ? 1 : 0);
        }
        static get axisY() {
            return (Input.key.ArrowDown || Input.key.KeyS ? -1 : 0) + (Input.key.ArrowUp || Input.key.KeyW ? 1 : 0);
        }
        static get actionA() {
            return Input.key.Numpad0 || Input.key.ShiftLeft || (Input.mouse && Input.mouse.Button0);
        }
        static get actionB() {
            return Input.key.NumpadDecimal || Input.key.KeyZ || (Input.mouse && Input.mouse.button2);
        }
        static get actionC() {
            return Input.key.NumpadEnter || Input.key.KeyX || (Input.mouse && Input.mouse.button1);
        }
        static get axisX1() {
            return (Input.key.KeyA ? -1 : 0) + (Input.key.KeyD ? 1 : 0);
        }
        static get axisY1() {
            return (Input.key.KeyS ? -1 : 0) + (Input.key.KeyW ? 1 : 0);
        }
        static get actionA1() {
            return Input.key.ShiftLeft || Input.key.KeyG;
        }
        static get actionB1() {
            return Input.key.KeyZ || Input.key.KeyH;
        }
        static get actionC1() {
            return Input.key.KeyX || Input.key.KeyJ;
        }
        static get axisX2() {
            return (Input.key.ArrowLeft ? -1 : 0) + (Input.key.ArrowRight ? 1 : 0);
        }
        static get axisY2() {
            return (Input.key.ArrowDown ? -1 : 0) + (Input.key.ArrowUp ? 1 : 0);
        }
        static get actionA2() {
            return Input.key.Numpad0;
        }
        static get actionB2() {
            return Input.key.NumpadDecimal;
        }
        static get actionC2() {
            return Input.key.NumpadEnter;
        }
        static keyEvent(evt) {
            switch (evt.type) {
                case 'keydown':
                    Input.key[evt.code] = true;
                    Input.inkey = evt.key.length === 1 ? Input.inkey + evt.key : (evt.keyCode === 8 ? Input.inkey.slice(0, -1) : Input.inkey);
                    break;
                case 'keyup':
                    delete Input.key[evt.code];
                    Input.click[evt.code] = true;
                    break;
            }
        }
        static mouseEvent(evt) {
            switch (evt.type) {
                case 'mouseout':
                    Input.mouse = null;
                    break;
                case 'mouseup':
                    Input.mouse = Input.mouse || {};
                    delete Input.mouse['Button' + evt.button];
                    break;
                case 'mousedown':
                    Input.mouse = Input.mouse || {};
                    Input.mouse['Button' + evt.button] = true;
                case 'mousemove':
                    Input.mouse = Input.mouse || {};
                    let rect = gc_engine_1.Engine.guiContainer.getBoundingClientRect();
                    Input.mouse.x = Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * gc_engine_1.Engine.guiContainer.width);
                    Input.mouse.y = Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * gc_engine_1.Engine.guiContainer.height);
                    break;
            }
        }
        static Update() {
            for (const prop of Object.getOwnPropertyNames(Input.click)) {
                delete Input.click[prop];
            }
        }
    }
    Input.key = {};
    Input.click = {};
    Input.inkeyCache = null;
    Input.inkey = '';
    Input.mouse = null;
    exports.Input = Input;
});
define("gc-engine/gc-utils", ["require", "exports", "gc-engine/THREE"], function (require, exports, THREE_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Time {
        static Update() {
            let delta = Time.clock.getDelta();
            Time.elapsedTime = Time.clock.elapsedTime;
            Time.deltaTime = THREE_1.THREE.Math.clamp(delta * Time.timeScale, 0, 0.1);
            Time.fpsExact = (1 / (delta || 0.005)) || 0;
            Time.fpsSmooth = Time.fpsSmooth + (Time.fpsExact - Time.fpsSmooth) * 0.015;
            Time.fps = Math.round(Time.fpsSmooth);
        }
    }
    Time.clock = new THREE_1.THREE.Clock();
    Time.deltaTime = 0.01;
    Time.timeScale = 1;
    Time.elapsedTime = 0;
    Time.fpsExact = 30;
    Time.fpsSmooth = 30;
    Time.fps = 30;
    exports.Time = Time;
    class SmoothDamp {
        constructor(value = 0, target = 0, time = 0.1) {
            this.value = value;
            this.target = target;
            this.time = time;
            this.currentVelocity = 0;
            this.maxSpeed = 1;
        }
        Update() {
            this.value += (this.target - this.value) * (1 / this.time) * Time.deltaTime;
        }
    }
    exports.SmoothDamp = SmoothDamp;
    class DegRadMap {
        constructor(obj) {
            this.obj = obj;
            this.deg2rad = THREE_1.THREE.Math.DEG2RAD;
            this.rad2deg = THREE_1.THREE.Math.RAD2DEG;
        }
        get x() {
            return this.obj.rotation.x * this.rad2deg;
        }
        get y() {
            return this.obj.rotation.y * this.rad2deg;
        }
        get z() {
            return this.obj.rotation.z * this.rad2deg;
        }
        set x(x) {
            this.obj.rotation.x = x * this.deg2rad;
        }
        set y(y) {
            this.obj.rotation.y = y * this.deg2rad;
        }
        set z(z) {
            this.obj.rotation.z = z * this.deg2rad;
        }
        set(x, y, z) {
            this.obj.rotation.set(x * this.deg2rad, y * this.deg2rad, z * this.deg2rad);
        }
        rotate(x, y, z) {
            this.obj.rotateX(x * this.deg2rad);
            this.obj.rotateY(y * this.deg2rad);
            this.obj.rotateZ(z * this.deg2rad);
        }
        rotateX(x) {
            this.obj.rotateX(x * this.deg2rad);
        }
        rotateY(y) {
            this.obj.rotateY(y * this.deg2rad);
        }
        rotateZ(z) {
            this.obj.rotateZ(z * this.deg2rad);
        }
    }
    exports.DegRadMap = DegRadMap;
    class Collision {
        constructor(obj) {
            this.obj = obj;
            this.radius = 0.5;
            this.size = new THREE_1.THREE.Vector3(1, 1, 1);
        }
        sphere(target) {
            return this.obj.position.distanceTo(target.position) - this.obj.collision.radius - target.collision.radius < 0;
        }
        box(target) {
            return Math.abs(this.obj.position.x - target.position.x) - this.obj.collision.size.x / 2 - target.collision.size.x / 2 < 0 &&
                Math.abs(this.obj.position.y - target.position.y) - this.obj.collision.size.y / 2 - target.collision.size.y / 2 < 0 &&
                Math.abs(this.obj.position.z - target.position.z) - this.obj.collision.size.z / 2 - target.collision.size.z / 2 < 0;
        }
    }
    exports.Collision = Collision;
    class Utils {
        static applyTexture(obj, texture) {
            let material = new THREE_1.THREE.MeshBasicMaterial({ map: texture });
            obj.traverse((node) => {
                if (node.geometry) {
                    node.material = material;
                }
            });
        }
    }
    exports.Utils = Utils;
});
define("gc-engine/gc-loader", ["require", "exports", "gc-engine/THREE"], function (require, exports, THREE_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function LoadDecorator(config) {
        Loader.Load(config.path, config.resources);
    }
    exports.Load = LoadDecorator;
    class Loader {
        static get progress() {
            if (Loader.loading > 0) {
                if (Loader.loading > Loader.maxProgress) {
                    Loader.maxProgress = Loader.loading;
                }
                return Math.round(100 / Loader.maxProgress * (Loader.maxProgress - Loader.loading));
            }
            else {
                Loader.maxProgress = 0;
                return 100;
            }
        }
        static Load(path, list) {
            path = path ? path + '/' : '';
            list.forEach((file) => {
                switch (Loader.getFileExtension(file)) {
                    case 'ogg':
                        Loader.loadSound(path + file);
                        break;
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                        Loader.loadTexture(path + file);
                        break;
                    case 'json':
                        Loader.loadModel(path + file);
                        break;
                    default:
                        Loader.loadModel(path + file + '.json');
                }
            });
        }
        static loadModel(file) {
            const name = Loader.getFileBaseName(file);
            if (Loader.models[name]) {
                return;
            }
            Loader.loading++;
            Loader.objectLoader.load(file, (model) => {
                Loader.models[name] = model;
                Loader.loading--;
            });
        }
        static loadTexture(file) {
            const name = Loader.getFileBaseName(file);
            if (Loader.textures[name]) {
                return;
            }
            Loader.loading++;
            Loader.textureLoader.load(file, (texture) => {
                Loader.textures[name] = texture;
                Loader.loading--;
            });
        }
        static loadSound(file) {
            const name = Loader.getFileBaseName(file);
            if (Loader.sounds[name]) {
                return;
            }
            Loader.loading++;
            Loader.audioLoader.load(file, function (sound) {
                Loader.sounds[name] = sound;
                Loader.loading--;
            });
        }
        static getFileExtension(file) {
            const parts = (file || '').split('.');
            return parts[parts.length - 1].toLowerCase();
        }
        static getFileName(file) {
            const lastIndex = (file || '').lastIndexOf('/');
            return lastIndex !== -1 ? file.substr(lastIndex + 1) : file;
        }
        static getFileBaseName(file) {
            file = Loader.getFileName(file || '');
            const lastIndex = file.lastIndexOf('.');
            return lastIndex !== -1 ? file.substr(0, lastIndex) : file;
        }
    }
    Loader.maxProgress = 0;
    Loader.loading = 0;
    Loader.objectLoader = new THREE_2.THREE.ObjectLoader();
    Loader.textureLoader = new THREE_2.THREE.TextureLoader();
    Loader.audioLoader = new THREE_2.THREE.AudioLoader();
    Loader.models = {};
    Loader.textures = {};
    Loader.materials = {};
    Loader.sounds = {};
    exports.Loader = Loader;
});
define("gc-engine/gc-engine", ["require", "exports", "gc-engine/THREE", "gc-engine/gc-input", "gc-engine/gc-utils", "gc-engine/gc-loader"], function (require, exports, THREE_3, gc_input_1, gc_utils_1, gc_loader_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Engine {
        static Init(width = 0, height = 0, force = false) {
            Engine.width = width || window.innerWidth;
            Engine.height = height || window.innerHeight;
            Engine.aspect = Engine.width / Engine.height;
            Engine.renderer = new THREE_3.THREE.WebGLRenderer();
            Engine.listener = new THREE_3.THREE.AudioListener();
            Engine.audio = new THREE_3.THREE.Audio(Engine.listener);
            Engine.audio.autoplay = true;
            Engine.audio.setVolume(0.2);
            Engine.audio.setLoop(true);
            if (force) {
                Engine.renderer.setSize(Engine.width, Engine.height);
            }
            else {
                Engine.renderer.setSize(window.innerWidth, window.innerWidth / Engine.aspect);
            }
            const css = document.createElement('style');
            css.innerHTML = `body{padding: 0;margin: 0;background-color: #000000;}
canvas{
    width: 100vw !important;
    height: ${Engine.height / Engine.width * 100}vw !important;
    background: transparent !important;
    max-height: 100vh;
    max-width: ${Engine.width / Engine.height * 100}vh; /* 16/9 = 1.778 */
    margin: auto;
    position: fixed;
    top:0;bottom:0;
    left:0;right:0;
}`;
            document.head.appendChild(css);
            document.body.appendChild(Engine.renderer.domElement);
            Engine.InitGui(Engine.width, Engine.height);
            gc_input_1.Input.Init();
            gc_utils_1.Time.Update();
            Engine.renderer.setAnimationLoop(() => {
                Engine.renderFrame();
            });
        }
        static get volume() {
            return Engine.listener.getMasterVolume();
        }
        static set volume(volume) {
            Engine.listener.setMasterVolume(volume);
        }
        static InitGui(width, height) {
            if (Engine.guiContainer) {
                Engine.guiContainer.parentNode.removeChild(Engine.guiContainer);
            }
            Engine.guiContainer = document.createElement('canvas');
            Engine.guiContainer.width = width;
            Engine.guiContainer.height = height;
            Engine.gui = Engine.guiContainer.getContext('2d');
            Engine.guiContainer.oncontextmenu = function (e) {
                e.preventDefault();
            };
            document.body.appendChild(Engine.guiContainer);
        }
        static SetScene(scene) {
            if (Engine.scene) {
                Engine.scene.camera.dispose();
                Engine.scene.dispose();
            }
            gc_input_1.Input.inkey = '';
            Engine.fade = 1;
            Engine.scene = scene;
        }
        static Broadcast(objs, method) {
            const p = Array.from(arguments).slice(2);
            objs.traverse((obj) => {
                if (obj[method]) {
                    obj[method].apply(obj, p);
                }
            });
        }
        static renderLoop() {
            Engine.renderFrame();
            window.requestAnimationFrame(Engine.renderLoop);
        }
        static renderFrame() {
            if (gc_loader_1.Loader.loading) {
                Engine.gui.save();
                Engine.loadingScreen(Engine.gui);
                Engine.gui.restore();
            }
            if (Engine.scene && !Engine.rendering && !gc_loader_1.Loader.loading) {
                Engine.rendering = true;
                if (Engine.prewarm > 0) {
                    gc_utils_1.Time.deltaTime = 0.1;
                    do {
                        Engine.scene.traverse((obj) => {
                            Engine.updateObject(obj);
                        });
                        Engine.prewarm -= 0.1;
                    } while (Engine.prewarm > 0);
                }
                gc_utils_1.Time.Update();
                Engine.gui.clearRect(0, 0, Engine.width, Engine.height);
                Engine.updateObjects();
                Engine.fade -= gc_utils_1.Time.deltaTime * 0.5;
                if (Engine.fade > 0.1) {
                    Engine.gui.save();
                    Engine.gui.fillStyle = 'rgba(0,0,0,' + Engine.fade + ')';
                    Engine.gui.fillRect(0, 0, Engine.width, Engine.height);
                    Engine.gui.restore();
                }
                if (Engine.fade < 0.99) {
                    Engine.renderer.render(Engine.scene, Engine.scene.camera);
                }
                Engine.rendering = false;
            }
            gc_input_1.Input.Update();
        }
        static updateObjects() {
            const toDestroy = [];
            Engine.scene.traverse((obj) => {
                Engine.updateObject(obj);
                if (obj.userData.toDestroy) {
                    toDestroy.push(obj);
                }
            });
            toDestroy.forEach((obj) => {
                if (obj) {
                    if (obj.OnDestroy) {
                        obj.OnDestroy();
                    }
                    if (obj.parent) {
                        obj.parent.remove(obj);
                    }
                    else {
                        Engine.scene.remove(obj);
                    }
                }
            });
        }
        static updateObject(obj) {
            if (!obj.userData.isLoaded && obj.OnLoad) {
                obj.SetObject(obj.OnLoad());
                obj.userData.isLoaded = true;
            }
            if (!obj.userData.isStarted && obj.Start) {
                obj.Start();
                obj.userData.isStarted = true;
            }
            if (obj.userData.controllers) {
                for (let key in obj.userData.controllers) {
                    if (obj.userData.controllers.hasOwnProperty(key)) {
                        let c = obj.userData.controllers[key];
                        c.Update();
                        c.obj[c.prop] = c.value;
                    }
                }
            }
            if (obj.Update) {
                obj.Update();
            }
            if (obj.OnGui) {
                Engine.updateObjectGui(obj);
            }
            if (obj.userData.life > 0) {
                obj.userData.life -= gc_utils_1.Time.deltaTime;
                if (obj.userData.life <= 0) {
                    obj.userData.toDestroy = true;
                }
            }
        }
        static updateObjectGui(obj) {
            Engine.gui.save();
            if (obj.userData.gui) {
                Engine.gui.translate(obj.position.x, obj.position.y);
                Engine.gui.rotate(obj.rotation.z);
                Engine.gui.scale(obj.scale.x, obj.scale.y);
                Engine.gui.globalAlpha = obj.alpha;
            }
            obj.OnGui(Engine.gui);
            Engine.gui.globalAlpha = 1;
            Engine.gui.restore();
        }
        static loadingScreen(gui) {
            Engine.fade = THREE_3.THREE.Math.clamp(Engine.fade + gc_utils_1.Time.deltaTime * 2, 0, 1);
            gui.clearRect(0, 0, Engine.width, Engine.height);
            gui.fillStyle = 'rgba(0,0,0,' + Engine.fade + ')';
            gui.fillRect(0, 0, Engine.width, Engine.height);
            gui.font = "30px Verdana";
            gui.textAlign = "center";
            let t = "LOADING: " + gc_loader_1.Loader.progress + '%';
            gui.translate(Engine.width / 2, Engine.height - 50);
            gui.fillStyle = "#000000";
            gui.fillText(t, -1, 0);
            gui.fillText(t, 1, 0);
            gui.fillText(t, 0, -1);
            gui.fillText(t, 0, 1);
            gui.fillStyle = "#FFFFFF";
            gui.fillText(t, 0, 0);
        }
    }
    Engine.width = 0;
    Engine.height = 0;
    Engine.aspect = 0;
    Engine.rendering = false;
    Engine.prewarm = 0;
    Engine.fade = 0;
    exports.Engine = Engine;
});
define("gc-engine/gc-objects", ["require", "exports", "gc-engine/THREE", "gc-engine/gc-utils", "gc-engine/gc-engine"], function (require, exports, THREE_4, gc_utils_2, gc_engine_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Object3D extends THREE_4.THREE.Object3D {
        constructor(obj = null) {
            super();
            this.rotationDeg = new gc_utils_2.DegRadMap(this);
            this.collision = new gc_utils_2.Collision(this);
            this.SetObject(obj);
            this.SetObject(this.Init());
        }
        Init() {
        }
        Destroy() {
            this.userData.toDestroy = true;
        }
        SetObject(obj) {
            if (obj) {
                for (let key in obj) {
                    switch (key) {
                        case 'position':
                        case 'rotation':
                        case 'quaternion':
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
        SetController(key, controller) {
            this.userData.controllers = this.userData.controllers || {};
            let props = key.split('.');
            if (props.length > 1) {
                controller.obj = this[props[0]];
                controller.prop = props[1];
            }
            else {
                controller.obj = this;
                controller.prop = props[0];
            }
            this.userData.controllers[key] = controller;
        }
        get attr() {
            return this.userData;
        }
        get list() {
            this.userData.list = this.userData.list || [];
            return this.userData.list;
        }
        add(obj) {
            super.add(obj);
            if (obj && obj.tag) {
                this.list[obj.tag] = this.list[obj.tag] || [];
                this.list[obj.tag].push(obj);
            }
        }
        remove(obj) {
            super.remove(obj);
            if (obj && obj.tag && this.list[obj.tag]) {
                const index = this.list[obj.tag].indexOf(obj);
                if (index > -1) {
                    this.list[obj.tag].splice(index, 1);
                }
            }
        }
        get audio() {
            if (!this._audio) {
                this._audio = new THREE_4.THREE.PositionalAudio(gc_engine_2.Engine.listener);
                this.add(this._audio);
            }
            return this._audio;
        }
    }
    exports.Object3D = Object3D;
    class AnimatedSprite extends Object3D {
        constructor(texture, tileX, tileY) {
            super(new THREE_4.THREE.Sprite(new THREE_4.THREE.SpriteMaterial({ map: texture })));
            this.frame = 0;
            this.tileX = tileX;
            this.tileY = tileY;
        }
        onBeforeRender() {
            this.material.map.repeat.x = 1 / this.tileX;
            this.material.map.repeat.y = 1 / this.tileY;
            let frame = Math.round(this.frame);
            let fx = 1 / this.tileX * (frame % this.tileX);
            let fy = 1 - 1 / this.tileY - (1 / this.tileY * Math.floor((frame / this.tileX)));
            this.material.map.offset.x = fx;
            this.material.map.offset.y = fy;
        }
    }
    exports.AnimatedSprite = AnimatedSprite;
    class Scene extends Object3D {
        constructor() {
            super(new THREE_4.THREE.Scene());
            this.camera = new THREE_4.THREE.PerspectiveCamera(50, gc_engine_2.Engine.aspect, 0.1, 1000);
            this.camera.rotationDeg = new gc_utils_2.DegRadMap(this.attr.camera);
            this.camera.add(gc_engine_2.Engine.listener);
        }
    }
    exports.Scene = Scene;
});
define("src/level1", ["require", "exports", "gc-engine/gc-objects", "gc-engine/gc-loader", "gc-engine/gc-utils"], function (require, exports, gc_objects_1, gc_loader_2, gc_utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Level1 extends gc_objects_1.Object3D {
        OnLoad() {
            return gc_loader_2.Loader.models.level.clone();
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
            this.position.x -= gc_utils_3.Time.deltaTime * 10;
            if (this.position.x < -120) {
                this.Destroy();
            }
        }
    }
    exports.Level1 = Level1;
});
define("src/explosion", ["require", "exports", "gc-engine/gc-objects", "gc-engine/gc-loader", "gc-engine/gc-utils", "gc-engine/THREE"], function (require, exports, gc_objects_2, gc_loader_3, gc_utils_4, THREE_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Explosion extends gc_objects_2.AnimatedSprite {
        constructor(position) {
            super(gc_loader_3.Loader.textures.explosion, 5, 5);
            this.position.set(position.x + THREE_5.THREE.Math.randFloatSpread(2), position.y + THREE_5.THREE.Math.randFloatSpread(2), position.z + THREE_5.THREE.Math.randFloatSpread(2));
        }
        Start() {
            let size = THREE_5.THREE.Math.randFloat(0, 4);
            this.scale.set(size, size, size);
            this.attr.moveX = THREE_5.THREE.Math.randFloatSpread(30);
            this.attr.moveY = THREE_5.THREE.Math.randFloatSpread(30);
            this.attr.moveZ = THREE_5.THREE.Math.randFloatSpread(30);
            this.material.rotation = Math.random() * Math.PI * 2;
            this.frame = THREE_5.THREE.Math.randFloat(0, 25);
        }
        Update() {
            this.frame += gc_utils_4.Time.deltaTime * 20;
            this.position.x += gc_utils_4.Time.deltaTime * this.attr.moveX;
            this.position.y += gc_utils_4.Time.deltaTime * this.attr.moveY;
            this.position.z += gc_utils_4.Time.deltaTime * this.attr.moveZ;
            this.scale.x = THREE_5.THREE.Math.clamp(this.scale.x - gc_utils_4.Time.deltaTime, 0, 10);
            this.scale.y = THREE_5.THREE.Math.clamp(this.scale.y - gc_utils_4.Time.deltaTime, 0, 10);
            this.scale.z = THREE_5.THREE.Math.clamp(this.scale.z - gc_utils_4.Time.deltaTime, 0, 10);
            this.material.opacity = THREE_5.THREE.Math.clamp(1 - (this.frame / 25), 0, 1);
            if (this.frame >= 25) {
                this.Destroy();
            }
        }
    }
    exports.Explosion = Explosion;
});
define("src/bullet", ["require", "exports", "gc-engine/gc-loader", "gc-engine/gc-utils", "src/explosion", "gc-engine/gc-objects", "gc-engine/gc-engine"], function (require, exports, gc_loader_4, gc_utils_5, explosion_1, gc_objects_3, gc_engine_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Bullet extends gc_objects_3.Object3D {
        constructor() {
            super(...arguments);
            this.tag = 'bullet';
        }
        Init() {
            return gc_loader_4.Loader.models.bullet.clone();
        }
        Start() {
            this.scale.x = 10;
            this.scale.y = 10;
            this.scale.z = 10;
            this.audio.setBuffer(gc_loader_4.Loader.sounds.shoot);
            this.audio.setVolume(10);
            this.audio.play();
        }
        Update() {
            this.position.x += gc_utils_5.Time.deltaTime * 100;
            if (this.position.x > 32) {
                this.Destroy();
            }
            if (gc_engine_3.Engine.scene.list.enemy) {
                gc_engine_3.Engine.scene.list.enemy.forEach((enemy) => {
                    if (this.collision.sphere(enemy)) {
                        this.Destroy();
                        gc_engine_3.Engine.scene.add(new explosion_1.Explosion(this.position));
                        enemy.applyDamage(1);
                    }
                });
            }
        }
    }
    exports.Bullet = Bullet;
});
define("src/main-player", ["require", "exports", "gc-engine/gc-objects", "gc-engine/gc-utils", "gc-engine/gc-loader", "gc-engine/gc-input", "src/bullet", "gc-engine/THREE", "gc-engine/gc-engine"], function (require, exports, gc_objects_4, gc_utils_6, gc_loader_5, gc_input_2, bullet_1, THREE_6, gc_engine_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainPlayer extends gc_objects_4.Object3D {
        OnLoad() {
            return gc_loader_5.Loader.models.SpaceShip;
        }
        Start() {
            this.attr.moveX = new gc_utils_6.SmoothDamp();
            this.attr.moveY = new gc_utils_6.SmoothDamp();
            this.attr.shootTimer = 0;
        }
        Update() {
            this.attr.shootTimer += gc_utils_6.Time.deltaTime;
            if (gc_input_2.Input.actionA && this.attr.shootTimer > 0.15) {
                let b = new bullet_1.Bullet();
                b.position.set(this.position.x, this.position.y - 0.9, this.position.z);
                gc_engine_4.Engine.scene.add(b);
                this.attr.shootTimer = 0;
            }
            this.attr.moveX.target = gc_input_2.Input.axisX;
            this.attr.moveY.target = gc_input_2.Input.axisY;
            this.attr.moveX.Update();
            this.attr.moveY.Update();
            this.rotationDeg.x = 0 - this.attr.moveY.value * 15 * (1 + Math.abs(this.attr.moveX.value));
            this.rotationDeg.y = 90;
            this.position.x = THREE_6.THREE.Math.clamp(this.position.x + this.attr.moveX.value * gc_utils_6.Time.deltaTime * 20, -28, 28);
            this.position.y = THREE_6.THREE.Math.clamp(this.position.y + this.attr.moveY.value * gc_utils_6.Time.deltaTime * 20, -15, 15);
        }
    }
    exports.MainPlayer = MainPlayer;
});
define("gc-engine/gc-gui", ["require", "exports", "gc-engine/THREE"], function (require, exports, THREE_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GuiObject extends THREE_7.THREE.Object3D {
        constructor() {
            super();
            this.alpha = 1;
            this.userData.gui = {};
            this.Init();
        }
        Init() {
        }
        Destroy() {
            this.userData.toDestroy = true;
        }
        get angle() {
            return this.rotation.z;
        }
        set angle(angle) {
            this.rotation.z = angle;
        }
        get angleDeg() {
            return this.rotation.z * THREE_7.THREE.Math.RAD2DEG;
        }
        set angleDeg(angleDeg) {
            this.rotation.z = angleDeg * THREE_7.THREE.Math.DEG2RAD;
        }
        get gui() {
            return this.userData.gui;
        }
        OnGui(gui) {
            for (const prop of Object.getOwnPropertyNames(this.userData.gui)) {
                gui[prop] = this.userData.gui[prop];
            }
        }
    }
    exports.GuiObject = GuiObject;
    class GuiText extends GuiObject {
        constructor() {
            super();
            this.text = '';
            this.lineHeight = 30;
            this.gui.font = '20px Impact';
            this.gui.textAlign = 'start';
            this.gui.textBaseline = 'top';
            this.gui.fillStyle = '#ffffff99';
        }
        OnGui(gui) {
            super.OnGui(gui);
            const text = this.text.split('\n');
            for (let i = 0; i < text.length; i++) {
                gui.fillText(text[i], 0, i * this.lineHeight);
            }
        }
    }
    exports.GuiText = GuiText;
});
define("src/enemy", ["require", "exports", "gc-engine/gc-loader", "gc-engine/gc-utils", "gc-engine/gc-objects", "gc-engine/THREE", "src/explosion", "gc-engine/gc-engine"], function (require, exports, gc_loader_6, gc_utils_7, gc_objects_5, THREE_8, explosion_2, gc_engine_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Enemy extends gc_objects_5.Object3D {
        constructor() {
            super(gc_loader_6.Loader.models.asteroid.clone());
            this.tag = 'enemy';
        }
        Init() {
            this.scale.x = 2;
            this.scale.y = 2;
            this.scale.z = 2;
            this.position.x = 33;
            this.position.y = THREE_8.THREE.Math.randFloatSpread(30);
            this.collision.radius = 2;
            this.attr.health = 3;
            this.material = this.material.clone();
            this.material.emissive = new THREE_8.THREE.Color(0x995511);
            this.material.emissiveIntensity = 0;
        }
        Update() {
            this.material.emissiveIntensity = 0;
            this.position.x -= gc_utils_7.Time.deltaTime * 10;
            this.rotationDeg.x += gc_utils_7.Time.deltaTime * 30;
            this.rotationDeg.y += gc_utils_7.Time.deltaTime * 90;
            this.rotationDeg.z += gc_utils_7.Time.deltaTime * 20;
            if (this.position.x < -33) {
                this.Destroy();
            }
        }
        applyDamage(damage) {
            this.material.emissiveIntensity = 1;
            this.attr.health -= damage;
            if (this.attr.health <= 0) {
                gc_engine_5.Engine.scene.attr.score += 100;
                this.Destroy();
                for (let i = 0; i < 100; i++) {
                    gc_engine_5.Engine.scene.add(new explosion_2.Explosion(this.position));
                }
            }
        }
    }
    exports.Enemy = Enemy;
});
define("src/main-scene", ["require", "exports", "gc-engine/gc-loader", "gc-engine/gc-objects", "src/level1", "gc-engine/THREE", "src/main-player", "gc-engine/gc-gui", "gc-engine/gc-utils", "src/enemy", "gc-engine/gc-input", "gc-engine/gc-engine"], function (require, exports, gc_loader_7, gc_objects_6, level1_1, THREE_9, main_player_1, gc_gui_1, gc_utils_8, enemy_1, gc_input_3, gc_engine_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let MainScene = class MainScene extends gc_objects_6.Scene {
        constructor() {
            super();
            this.camera.position.z = 100;
            this.camera.near = 95;
            this.camera.far = 500;
            this.camera.fov = 20;
            this.camera.updateProjectionMatrix();
            this.add(new level1_1.Level1());
            var light = new THREE_9.THREE.PointLight(0xffffff, 0.5, 500);
            light.position.set(0, 0, 10);
            this.add(light);
            this.add(new main_player_1.MainPlayer());
            this.attr.blockTimer = 0;
            this.attr.enemyTimer = 0;
            gc_engine_6.Engine.prewarm = 15;
            this.attr.paused = false;
            this.attr.matrix = false;
            this.attr.guiText = new gc_gui_1.GuiText();
            this.attr.guiText.position.x = 10;
            this.attr.guiText.position.y = 50;
            this.add(this.attr.guiText);
            this.attr.score = 0;
        }
        Start() {
            gc_engine_6.Engine.audio.setBuffer(gc_loader_7.Loader.sounds.music);
        }
        Update() {
            this.attr.blockTimer += gc_utils_8.Time.deltaTime;
            if (this.attr.blockTimer > 10.7) {
                this.add(new level1_1.Level1());
                this.attr.blockTimer = 0;
            }
            this.attr.enemyTimer += gc_utils_8.Time.deltaTime;
            if (this.attr.enemyTimer > 0.5) {
                this.add(new enemy_1.Enemy());
                this.attr.enemyTimer = 0;
            }
            if (gc_input_3.Input.click.KeyP) {
                this.attr.paused = !this.attr.paused;
                gc_utils_8.Time.timeScale = this.attr.paused ? 0 : 1;
            }
            if (gc_input_3.Input.click.KeyM) {
                this.attr.matrix = !this.attr.matrix;
                gc_utils_8.Time.timeScale = this.attr.matrix ? 0.2 : 1;
            }
            this.attr.guiText.text = 'HEALTH: ' + '▓'.repeat(10) + '░'.repeat(5) + '\n\nSCORE: ' + (this.attr.score + 100000000).toString().substr(1) + '\nFPS: ' + gc_utils_8.Time.fps + (this.attr.paused ? '\nPAUSED' : '') + '\n\nCONTROLS: WASD ⇦ ⇨ ⇧ ⇩\nFIRE: Numpad0 ⇧ ꌷ';
        }
        OnGui(gui) {
            if (this.attr.paused) {
                gui.fillStyle = 'rgba(0,0,0,0.5)';
                gui.fillRect(0, 0, gc_engine_6.Engine.width, gc_engine_6.Engine.height);
            }
        }
    };
    MainScene = __decorate([
        gc_loader_7.Load({
            path: 'res',
            resources: [
                'SpaceShip',
                'bullet',
                'level',
                'asteroid',
                'explosion.png',
                'shoot.ogg'
            ]
        })
    ], MainScene);
    exports.MainScene = MainScene;
});
define("app", ["require", "exports", "gc-engine/gc-engine", "src/main-scene"], function (require, exports, gc_engine_7, main_scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        constructor() {
            gc_engine_7.Engine.Init(1280, 720, true);
            gc_engine_7.Engine.SetScene(new main_scene_1.MainScene());
        }
    }
    new App();
});
//# sourceMappingURL=app.js.map