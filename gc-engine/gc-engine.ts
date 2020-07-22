import {THREE} from "./THREE";
import {Input} from "./gc-input";
import {Time} from "./gc-utils";
import {Loader} from "./gc-loader";

export class Engine {

    public static width: number = 0;
    public static height: number = 0;
    public static aspect: number = 0;

    private static renderer: any;
    private static rendering = false;

    public static guiContainer: any;
    public static gui: any;

    public static scene;
    public static listener;
    public static audio;

    public static prewarm: number = 0;

    public static fade: number = 0;

    public static Init(width: number = 0, height: number = 0, force: boolean = false) {
        Engine.width = width || window.innerWidth;
        Engine.height = height || window.innerHeight;
        Engine.aspect = Engine.width / Engine.height;
        Engine.renderer = new THREE.WebGLRenderer();

        Engine.listener = new THREE.AudioListener();
        Engine.audio = new THREE.Audio(Engine.listener);
        Engine.audio.autoplay = true;
        Engine.audio.setVolume(0.2);
        Engine.audio.setLoop(true);

        if (force) {
            Engine.renderer.setSize(Engine.width, Engine.height);
        } else {
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
        
        Input.Init();

        Time.Update();

        Engine.renderer.setAnimationLoop(() => {
            Engine.renderFrame();
        });
    }

    public static get volume(): number {
        return Engine.listener.getMasterVolume();
    }

    public static set volume(volume: number) {
        Engine.listener.setMasterVolume(volume);
    }

    public static InitGui(width: number, height: number) {
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

    public static SetScene(scene) {
        if (Engine.scene) {
            Engine.scene.camera.dispose();
            Engine.scene.dispose();
        }
        Input.inkey = '';
        Engine.fade = 1;
        Engine.scene = scene;
    }

    public static Broadcast(objs, method) {
        const p = Array.from(arguments).slice(2);
        objs.traverse((obj) => {
            if (obj[method]) {
                obj[method].apply(obj, p);
            }
        })
    }

    private static renderLoop() {
        Engine.renderFrame();
        window.requestAnimationFrame(Engine.renderLoop);
    }

    private static renderFrame() {

        if (Loader.loading) {
            Engine.gui.save();
            Engine.loadingScreen(Engine.gui);
            Engine.gui.restore();
        }

        if (Engine.scene && !Engine.rendering && !Loader.loading) {
            Engine.rendering = true;

            if (Engine.prewarm > 0) {
                Time.deltaTime = 0.1;
                do {
                    Engine.scene.traverse((obj) => {
                        Engine.updateObject(obj);
                    });
                    Engine.prewarm -= 0.1;
                } while (Engine.prewarm > 0);
            }

            Time.Update();

            Engine.gui.clearRect(0, 0, Engine.width, Engine.height);

            Engine.updateObjects();

            Engine.fade -= Time.deltaTime * 0.5;
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

        Input.Update();

    }

    private static updateObjects() {
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
                } else {
                    Engine.scene.remove(obj);
                }
            }
        });
    }

    private static updateObject(obj) {
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
            obj.userData.life -= Time.deltaTime;
            if (obj.userData.life <= 0) {
                obj.userData.toDestroy = true;
            }
        }
    }

    public static updateObjectGui(obj) {
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

    public static loadingScreen(gui) {

        Engine.fade = THREE.Math.clamp(Engine.fade + Time.deltaTime * 2, 0, 1);
        gui.clearRect(0, 0, Engine.width, Engine.height);
        gui.fillStyle = 'rgba(0,0,0,' + Engine.fade + ')';
        gui.fillRect(0, 0, Engine.width, Engine.height);

        gui.font = "30px Verdana";
        gui.textAlign = "center";
        let t = "LOADING: " + Loader.progress + '%';
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