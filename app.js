(function(){
var exports = {};
function require(name){return exports};
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Config = {
    "openInNewTab": true,
    "entry": "Main",
    "embedJson": false,
    "embedJs": false,
    "scriptPriority": [
        "gc-engine",
        "src"
    ]
};
var Tween = /** @class */ (function () {
    function Tween(from, to, duration, easing, delay) {
        if (duration === void 0) { duration = 1; }
        if (easing === void 0) { easing = Easing.Default; }
        if (delay === void 0) { delay = 0; }
        this.from = from;
        this.to = to;
        this.duration = duration;
        this.easing = easing;
        this.delay = delay;
        this.fase = 0;
        this.value = 0;
        this.completed = false;
        this.speed = 1 / duration;
        this.value = this.from;
        this.fase = 0 - this.delay * this.speed;
    }
    Tween.prototype.Update = function () {
        this.fase = this.fase + this.speed * Time.deltaTime;
        if (this.fase <= 0) {
            this.value = this.from;
        }
        else if (this.fase >= 1) {
            this.value = this.to;
            this.completed = true;
        }
        else {
            this.value = this.from + (this.to - this.from) * this.easing(this.fase, 0, 1, 1);
        }
    };
    return Tween;
}());
var Smooth = /** @class */ (function () {
    function Smooth(from, target, duration) {
        this.target = target;
        this.duration = duration;
        this.value = from;
    }
    Smooth.prototype.Update = function () {
        this.value = this.value + (this.target - this.value) * this.duration * Time.deltaTime;
    };
    return Smooth;
}());
var Easing = /** @class */ (function () {
    function Easing() {
    }
    Easing.Default = function (t) {
        return t;
    };
    Easing.InQuad = function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    Easing.OutQuad = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    Easing.InOutQuad = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    Easing.InCubic = function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    Easing.OutCubic = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    Easing.InOutCubic = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    Easing.InQuart = function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    Easing.OutQuart = function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    Easing.InOutQuart = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };
    Easing.InQuint = function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    Easing.OutQuint = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    Easing.InOutQuint = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };
    Easing.InSine = function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    Easing.OutSine = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    Easing.InOutSine = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    Easing.InExpo = function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    Easing.OutExpo = function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };
    Easing.InOutExpo = function (t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
    Easing.InCirc = function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    Easing.OutCirc = function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    Easing.InOutCirc = function (t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };
    Easing.InBack = function (t, b, c, d, s) {
        if (s === undefined)
            s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
    Easing.OutBack = function (t, b, c, d, s) {
        if (s === undefined)
            s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
    Easing.InOutBack = function (t, b, c, d, s) {
        if (s === undefined)
            s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    };
    Easing.InBounce = function (t, b, c, d) {
        return c - Easing.OutBounce(d - t, 0, c, d) + b;
    };
    Easing.OutBounce = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };
    Easing.InOutBounce = function (t, b, c, d) {
        if (t < d / 2)
            return Easing.InBounce(t * 2, 0, c, d) * .5 + b;
        return this.OutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    };
    Easing.InElastic = function (t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };
    Easing.OutElastic = function (t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    };
    Easing.InOutElastic = function (t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        if (!p)
            p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    };
    return Easing;
}());
exports.Easing = Easing;
var Engine = /** @class */ (function () {
    function Engine() {
    }
    Engine.Init = function (width, height, force) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (force === void 0) { force = false; }
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
        }
        else {
            Engine.renderer.setSize(window.innerWidth, window.innerWidth / Engine.aspect);
        }
        var css = document.createElement('style');
        css.innerHTML = "body{padding: 0;margin: 0;background-color: #000000;}\ncanvas{\n    width: 100vw !important;\n    height: " + Engine.height / Engine.width * 100 + "vw !important;\n    background: transparent !important;\n    max-height: 100vh;\n    max-width: " + Engine.width / Engine.height * 100 + "vh; /* 16/9 = 1.778 */\n    margin: auto;\n    position: fixed;\n    top:0;bottom:0;\n    left:0;right:0;\n}";
        document.head.appendChild(css);
        document.body.appendChild(Engine.renderer.domElement);
        Engine.InitGui(Engine.width, Engine.height);
        Input.Init();
        Time.Update();
        Engine.renderer.setAnimationLoop(function () {
            Engine.renderFrame();
        });
    };
    Object.defineProperty(Engine, "volume", {
        get: function () {
            return Engine.listener.getMasterVolume();
        },
        set: function (volume) {
            Engine.listener.setMasterVolume(volume);
        },
        enumerable: true,
        configurable: true
    });
    Engine.InitGui = function (width, height) {
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
    };
    Engine.SetScene = function (scene) {
        if (Engine.scene) {
            Engine.scene.camera.dispose();
            Engine.scene.dispose();
        }
        Input.inkey = '';
        Engine.fade = 1;
        Engine.scene = scene;
    };
    Engine.Broadcast = function (objs, method) {
        var p = Array.from(arguments).slice(2);
        objs.traverse(function (obj) {
            if (obj[method]) {
                obj[method].apply(obj, p);
            }
        });
    };
    Engine.renderLoop = function () {
        Engine.renderFrame();
        window.requestAnimationFrame(Engine.renderLoop);
    };
    Engine.renderFrame = function () {
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
                    Engine.scene.traverse(function (obj) {
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
    };
    Engine.updateObjects = function () {
        var toDestroy = [];
        Engine.scene.traverse(function (obj) {
            Engine.updateObject(obj);
            if (obj.userData.toDestroy) {
                toDestroy.push(obj);
            }
        });
        toDestroy.forEach(function (obj) {
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
    };
    Engine.updateObject = function (obj) {
        if (!obj.userData.isLoaded && obj.OnLoad) {
            obj.SetObject(obj.OnLoad());
            obj.userData.isLoaded = true;
        }
        if (!obj.userData.isStarted && obj.Start) {
            obj.Start();
            obj.userData.isStarted = true;
        }
        if (obj.userData.controllers) {
            for (var key in obj.userData.controllers) {
                if (obj.userData.controllers.hasOwnProperty(key)) {
                    var c = obj.userData.controllers[key];
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
    };
    Engine.updateObjectGui = function (obj) {
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
    };
    Engine.loadingScreen = function (gui) {
        Engine.fade = THREE.Math.clamp(Engine.fade + Time.deltaTime * 2, 0, 1);
        gui.clearRect(0, 0, Engine.width, Engine.height);
        gui.fillStyle = 'rgba(0,0,0,' + Engine.fade + ')';
        gui.fillRect(0, 0, Engine.width, Engine.height);
        gui.font = "30px Verdana";
        gui.textAlign = "center";
        var t = "LOADING: " + Loader.progress + '%';
        gui.translate(Engine.width / 2, Engine.height - 50);
        gui.fillStyle = "#000000";
        gui.fillText(t, -1, 0);
        gui.fillText(t, 1, 0);
        gui.fillText(t, 0, -1);
        gui.fillText(t, 0, 1);
        gui.fillStyle = "#FFFFFF";
        gui.fillText(t, 0, 0);
    };
    Engine.width = 0;
    Engine.height = 0;
    Engine.aspect = 0;
    Engine.rendering = false;
    Engine.prewarm = 0;
    Engine.fade = 0;
    return Engine;
}());
var GuiObject = /** @class */ (function (_super) {
    __extends(GuiObject, _super);
    function GuiObject() {
        var _this = _super.call(this) || this;
        _this.alpha = 1;
        _this.userData.gui = {};
        _this.Init();
        return _this;
    }
    GuiObject.prototype.Init = function () {
    };
    GuiObject.prototype.Destroy = function () {
        this.userData.toDestroy = true;
    };
    Object.defineProperty(GuiObject.prototype, "angle", {
        get: function () {
            return this.rotation.z;
        },
        set: function (angle) {
            this.rotation.z = angle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuiObject.prototype, "angleDeg", {
        get: function () {
            return this.rotation.z * THREE.Math.RAD2DEG;
        },
        set: function (angleDeg) {
            this.rotation.z = angleDeg * THREE.Math.DEG2RAD;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuiObject.prototype, "gui", {
        get: function () {
            return this.userData.gui;
        },
        enumerable: true,
        configurable: true
    });
    GuiObject.prototype.OnGui = function (gui) {
        for (var _i = 0, _a = Object.getOwnPropertyNames(this.userData.gui); _i < _a.length; _i++) {
            var prop = _a[_i];
            gui[prop] = this.userData.gui[prop];
        }
    };
    return GuiObject;
}(THREE.Object3D));
var GuiText = /** @class */ (function (_super) {
    __extends(GuiText, _super);
    function GuiText() {
        var _this = _super.call(this) || this;
        _this.text = '';
        _this.lineHeight = 30;
        _this.gui.font = '20px Impact';
        _this.gui.textAlign = 'start';
        _this.gui.textBaseline = 'top';
        _this.gui.fillStyle = '#ffffff99';
        return _this;
    }
    GuiText.prototype.OnGui = function (gui) {
        _super.prototype.OnGui.call(this, gui);
        var text = this.text.split('\n');
        for (var i = 0; i < text.length; i++) {
            gui.fillText(text[i], 0, i * this.lineHeight);
        }
    };
    return GuiText;
}(GuiObject));
var Input = /** @class */ (function () {
    function Input() {
    }
    Input.Init = function () {
        document.addEventListener('keydown', Input.keyEvent, false);
        document.addEventListener('keyup', Input.keyEvent, false);
        Engine.guiContainer.addEventListener('mousedown', Input.mouseEvent, false);
        Engine.guiContainer.addEventListener('mouseup', Input.mouseEvent, false);
        Engine.guiContainer.addEventListener('mouseover', Input.mouseEvent, false);
        Engine.guiContainer.addEventListener('mouseout', Input.mouseEvent, false);
        Engine.guiContainer.addEventListener('mousemove', Input.mouseEvent, false);
    };
    Object.defineProperty(Input, "axisX", {
        get: function () {
            return (Input.key.ArrowLeft || Input.key.KeyA ? -1 : 0) + (Input.key.ArrowRight || Input.key.KeyD ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "axisY", {
        get: function () {
            return (Input.key.ArrowDown || Input.key.KeyS ? -1 : 0) + (Input.key.ArrowUp || Input.key.KeyW ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionA", {
        get: function () {
            return Input.key.Numpad0 || Input.key.ShiftLeft || (Input.mouse && Input.mouse.Button0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionB", {
        get: function () {
            return Input.key.NumpadDecimal || Input.key.KeyZ || (Input.mouse && Input.mouse.button2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionC", {
        get: function () {
            return Input.key.NumpadEnter || Input.key.KeyX || (Input.mouse && Input.mouse.button1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "axisX1", {
        get: function () {
            return (Input.key.KeyA ? -1 : 0) + (Input.key.KeyD ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "axisY1", {
        get: function () {
            return (Input.key.KeyS ? -1 : 0) + (Input.key.KeyW ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionA1", {
        get: function () {
            return Input.key.ShiftLeft || Input.key.KeyG;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionB1", {
        get: function () {
            return Input.key.KeyZ || Input.key.KeyH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionC1", {
        get: function () {
            return Input.key.KeyX || Input.key.KeyJ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "axisX2", {
        get: function () {
            return (Input.key.ArrowLeft ? -1 : 0) + (Input.key.ArrowRight ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "axisY2", {
        get: function () {
            return (Input.key.ArrowDown ? -1 : 0) + (Input.key.ArrowUp ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionA2", {
        get: function () {
            return Input.key.Numpad0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionB2", {
        get: function () {
            return Input.key.NumpadDecimal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "actionC2", {
        get: function () {
            return Input.key.NumpadEnter;
        },
        enumerable: true,
        configurable: true
    });
    Input.keyEvent = function (evt) {
        switch (evt.type) {
            case 'keydown':
                Input.key[evt.code] = true;
                Input.inkey = evt.key.length === 1 ? Input.inkey + evt.key : (evt.keyCode === 8 ? Input.inkey.slice(0, -1) : Input.inkey);
                break;
            case 'keyup':
                delete Input.key[evt.code];
                ;
                Input.click[evt.code] = true;
                break;
        }
    };
    Input.mouseEvent = function (evt) {
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
                var rect = Engine.guiContainer.getBoundingClientRect();
                Input.mouse.x = Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * Engine.guiContainer.width);
                Input.mouse.y = Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * Engine.guiContainer.height);
                break;
        }
    };
    Input.Update = function () {
        for (var _i = 0, _a = Object.getOwnPropertyNames(Input.click); _i < _a.length; _i++) {
            var prop = _a[_i];
            delete Input.click[prop];
        }
    };
    Input.key = {};
    Input.click = {};
    Input.inkeyCache = null;
    Input.inkey = '';
    Input.mouse = null;
    return Input;
}());
exports.Input = Input;
function Load(config) {
    Loader.Load(config.path, config.resources);
}
var Loader = /** @class */ (function () {
    function Loader() {
    }
    Object.defineProperty(Loader, "progress", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Loader.Load = function (path, list) {
        path = path ? path + '/' : '';
        list.forEach(function (file) {
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
    };
    Loader.loadModel = function (file) {
        var name = Loader.getFileBaseName(file);
        if (Loader.models[name]) {
            return;
        }
        if (typeof Data !== 'undefined' && Data && Data[name]) {
            Loader.models[name] = Loader.objectLoader.parse(Data[name]);
            return;
        }
        Loader.loading++;
        Loader.objectLoader.load(file, function (model) {
            Loader.models[name] = model;
            Loader.loading--;
        });
    };
    Loader.loadTexture = function (file) {
        var name = Loader.getFileBaseName(file);
        if (Loader.textures[name]) {
            return;
        }
        Loader.loading++;
        Loader.textureLoader.load(file, function (texture) {
            Loader.textures[name] = texture;
            Loader.loading--;
        });
    };
    Loader.loadSound = function (file) {
        var name = Loader.getFileBaseName(file);
        if (Loader.sounds[name]) {
            return;
        }
        Loader.loading++;
        Loader.audioLoader.load(file, function (sound) {
            Loader.sounds[name] = sound;
            Loader.loading--;
        });
    };
    Loader.getFileExtension = function (file) {
        var parts = (file || '').split('.');
        return parts[parts.length - 1].toLowerCase();
    };
    Loader.getFileName = function (file) {
        var lastIndex = (file || '').lastIndexOf('/');
        return lastIndex !== -1 ? file.substr(lastIndex + 1) : file;
    };
    Loader.getFileBaseName = function (file) {
        file = Loader.getFileName(file || '');
        var lastIndex = file.lastIndexOf('.');
        return lastIndex !== -1 ? file.substr(0, lastIndex) : file;
    };
    Loader.maxProgress = 0;
    Loader.loading = 0;
    Loader.objectLoader = new THREE.ObjectLoader();
    Loader.textureLoader = new THREE.TextureLoader();
    Loader.audioLoader = new THREE.AudioLoader();
    Loader.models = {};
    Loader.textures = {};
    Loader.materials = {};
    Loader.sounds = {};
    return Loader;
}());
var Object3D = /** @class */ (function (_super) {
    __extends(Object3D, _super);
    function Object3D(obj) {
        if (obj === void 0) { obj = null; }
        var _this = _super.call(this) || this;
        _this.rotationDeg = new DegRadMap(_this);
        _this.collision = new Collision(_this);
        _this.SetObject(obj);
        _this.SetObject(_this.Init());
        return _this;
    }
    Object3D.prototype.Init = function () {
    };
    Object3D.prototype.Destroy = function () {
        this.userData.toDestroy = true;
    };
    Object3D.prototype.SetObject = function (obj) {
        if (obj) {
            for (var key in obj) {
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
    };
    Object3D.prototype.SetController = function (key, controller) {
        this.userData.controllers = this.userData.controllers || {};
        var props = key.split('.');
        if (props.length > 1) {
            controller.obj = this[props[0]];
            controller.prop = props[1];
        }
        else {
            controller.obj = this;
            controller.prop = props[0];
        }
        this.userData.controllers[key] = controller;
    };
    Object.defineProperty(Object3D.prototype, "attr", {
        get: function () {
            return this.userData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "list", {
        get: function () {
            this.userData.list = this.userData.list || [];
            return this.userData.list;
        },
        enumerable: true,
        configurable: true
    });
    Object3D.prototype.add = function (obj) {
        _super.prototype.add.call(this, obj);
        if (obj && obj.tag) {
            this.list[obj.tag] = this.list[obj.tag] || [];
            this.list[obj.tag].push(obj);
        }
    };
    Object3D.prototype.remove = function (obj) {
        _super.prototype.remove.call(this, obj);
        if (obj && obj.tag && this.list[obj.tag]) {
            var index = this.list[obj.tag].indexOf(obj);
            if (index > -1) {
                this.list[obj.tag].splice(index, 1);
            }
        }
    };
    Object.defineProperty(Object3D.prototype, "audio", {
        get: function () {
            if (!this._audio) {
                this._audio = new THREE.PositionalAudio(Engine.listener);
                this.add(this._audio);
            }
            return this._audio;
        },
        enumerable: true,
        configurable: true
    });
    return Object3D;
}(THREE.Object3D));
var AnimatedSprite = /** @class */ (function (_super) {
    __extends(AnimatedSprite, _super);
    function AnimatedSprite(texture, tileX, tileY) {
        var _this = _super.call(this, new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }))) || this;
        _this.frame = 0;
        _this.tileX = tileX;
        _this.tileY = tileY;
        return _this;
    }
    AnimatedSprite.prototype.onBeforeRender = function () {
        this.material.map.repeat.x = 1 / this.tileX;
        this.material.map.repeat.y = 1 / this.tileY;
        var frame = Math.round(this.frame);
        var fx = 1 / this.tileX * (frame % this.tileX);
        var fy = 1 - 1 / this.tileY - (1 / this.tileY * Math.floor((frame / this.tileX)));
        this.material.map.offset.x = fx;
        this.material.map.offset.y = fy;
    };
    return AnimatedSprite;
}(Object3D));
var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this, new THREE.Scene()) || this;
        _this.camera = new THREE.PerspectiveCamera(50, Engine.aspect, 0.1, 1000);
        _this.camera.rotationDeg = new DegRadMap(_this.attr.camera);
        _this.camera.add(Engine.listener);
        return _this;
    }
    return Scene;
}(Object3D));
var Time = /** @class */ (function () {
    function Time() {
    }
    Time.Update = function () {
        var delta = Time.clock.getDelta();
        Time.elapsedTime = Time.clock.elapsedTime;
        Time.deltaTime = THREE.Math.clamp(delta * Time.timeScale, 0, 0.1);
        Time.fpsExact = (1 / (delta || 0.005)) || 0;
        Time.fpsSmooth = Time.fpsSmooth + (Time.fpsExact - Time.fpsSmooth) * 0.015;
        Time.fps = Math.round(Time.fpsSmooth);
    };
    Time.clock = new THREE.Clock();
    Time.deltaTime = 0.01;
    Time.timeScale = 1;
    Time.elapsedTime = 0;
    Time.fpsExact = 30;
    Time.fpsSmooth = 30;
    Time.fps = 30;
    return Time;
}());
var SmoothDamp = /** @class */ (function () {
    function SmoothDamp(value, target, time) {
        if (value === void 0) { value = 0; }
        if (target === void 0) { target = 0; }
        if (time === void 0) { time = 0.1; }
        this.value = value;
        this.target = target;
        this.time = time;
        this.currentVelocity = 0;
        this.maxSpeed = 1;
    }
    SmoothDamp.prototype.Update = function () {
        this.value += (this.target - this.value) * (1 / this.time) * Time.deltaTime;
    };
    return SmoothDamp;
}());
var DegRadMap = /** @class */ (function () {
    function DegRadMap(obj) {
        this.obj = obj;
        this.deg2rad = THREE.Math.DEG2RAD;
        this.rad2deg = THREE.Math.RAD2DEG;
    }
    Object.defineProperty(DegRadMap.prototype, "x", {
        get: function () {
            return this.obj.rotation.x * this.rad2deg;
        },
        set: function (x) {
            this.obj.rotation.x = x * this.deg2rad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DegRadMap.prototype, "y", {
        get: function () {
            return this.obj.rotation.y * this.rad2deg;
        },
        set: function (y) {
            this.obj.rotation.y = y * this.deg2rad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DegRadMap.prototype, "z", {
        get: function () {
            return this.obj.rotation.z * this.rad2deg;
        },
        set: function (z) {
            this.obj.rotation.z = z * this.deg2rad;
        },
        enumerable: true,
        configurable: true
    });
    DegRadMap.prototype.set = function (x, y, z) {
        this.obj.rotation.set(x * this.deg2rad, y * this.deg2rad, z * this.deg2rad);
    };
    DegRadMap.prototype.rotate = function (x, y, z) {
        this.obj.rotateX(x * this.deg2rad);
        this.obj.rotateY(y * this.deg2rad);
        this.obj.rotateZ(z * this.deg2rad);
    };
    DegRadMap.prototype.rotateX = function (x) {
        this.obj.rotateX(x * this.deg2rad);
    };
    DegRadMap.prototype.rotateY = function (y) {
        this.obj.rotateY(y * this.deg2rad);
    };
    DegRadMap.prototype.rotateZ = function (z) {
        this.obj.rotateZ(z * this.deg2rad);
    };
    return DegRadMap;
}());
var Collision = /** @class */ (function () {
    function Collision(obj) {
        this.obj = obj;
        this.radius = 0.5;
        this.size = new THREE.Vector3(1, 1, 1);
    }
    Collision.prototype.sphere = function (target) {
        return this.obj.position.distanceTo(target.position) - this.obj.collision.radius - target.collision.radius < 0;
    };
    Collision.prototype.box = function (target) {
        return Math.abs(this.obj.position.x - target.position.x) - this.obj.collision.size.x / 2 - target.collision.size.x / 2 < 0 &&
            Math.abs(this.obj.position.y - target.position.y) - this.obj.collision.size.y / 2 - target.collision.size.y / 2 < 0 &&
            Math.abs(this.obj.position.z - target.position.z) - this.obj.collision.size.z / 2 - target.collision.size.z / 2 < 0;
    };
    return Collision;
}());
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.applyTexture = function (obj, texture) {
        var material = new THREE.MeshBasicMaterial({ map: texture });
        obj.traverse(function (node) {
            if (node.geometry) {
                node.material = material;
            }
        });
    };
    return Utils;
}());
var Main = /** @class */ (function () {
    function Main() {
        Engine.Init(1280, 720, true);
        Engine.SetScene(new MainScene());
    }
    return Main;
}());
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tag = 'bullet';
        return _this;
    }
    Bullet.prototype.Init = function () {
        return Loader.models.bullet.clone();
    };
    Bullet.prototype.Start = function () {
        this.scale.x = 10;
        this.scale.y = 10;
        this.scale.z = 10;
        this.audio.setBuffer(Loader.sounds.shoot);
        this.audio.setVolume(10);
        this.audio.play();
    };
    Bullet.prototype.Update = function () {
        var _this = this;
        this.position.x += Time.deltaTime * 100;
        if (this.position.x > 32) {
            this.Destroy();
        }
        if (Engine.scene.list.enemy) {
            Engine.scene.list.enemy.forEach(function (enemy) {
                if (_this.collision.sphere(enemy)) {
                    _this.Destroy();
                    Engine.scene.add(new Explosion(_this.position));
                    enemy.applyDamage(1);
                }
            });
        }
    };
    return Bullet;
}(Object3D));
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this, Loader.models.asteroid.clone()) || this;
        _this.tag = 'enemy';
        return _this;
    }
    Enemy.prototype.Init = function () {
        this.scale.x = 2;
        this.scale.y = 2;
        this.scale.z = 2;
        this.position.x = 33;
        this.position.y = THREE.Math.randFloatSpread(30);
        this.collision.radius = 2;
        this.attr.health = 3;
        this.material = this.material.clone();
        this.material.emissive = new THREE.Color(0x995511);
        this.material.emissiveIntensity = 0;
    };
    Enemy.prototype.Update = function () {
        this.material.emissiveIntensity = 0;
        this.position.x -= Time.deltaTime * 10;
        this.rotationDeg.x += Time.deltaTime * 30;
        this.rotationDeg.y += Time.deltaTime * 90;
        this.rotationDeg.z += Time.deltaTime * 20;
        if (this.position.x < -33) {
            this.Destroy();
        }
    };
    Enemy.prototype.applyDamage = function (damage) {
        this.material.emissiveIntensity = 1;
        this.attr.health -= damage;
        if (this.attr.health <= 0) {
            Engine.scene.attr.score += 100;
            this.Destroy();
            for (var i = 0; i < 50; i++) {
                Engine.scene.add(new Explosion(this.position));
            }
        }
    };
    return Enemy;
}(Object3D));
var Explosion = /** @class */ (function (_super) {
    __extends(Explosion, _super);
    function Explosion(position) {
        var _this = _super.call(this, Loader.textures.explosion, 5, 5) || this;
        _this.position.set(position.x + THREE.Math.randFloatSpread(2), position.y + THREE.Math.randFloatSpread(2), position.z + THREE.Math.randFloatSpread(2));
        return _this;
    }
    Explosion.prototype.Init = function () {
        var size = THREE.Math.randFloat(0, 4);
        this.scale.set(size, size, size);
        this.attr.moveX = THREE.Math.randFloatSpread(20);
        this.attr.moveY = THREE.Math.randFloatSpread(20);
        this.attr.moveZ = THREE.Math.randFloatSpread(20);
        this.material.rotation = Math.random() * Math.PI * 2;
        this.frame = THREE.Math.randFloat(0, 10);
    };
    Explosion.prototype.Update = function () {
        this.frame += Time.deltaTime * 40;
        this.position.x += Time.deltaTime * this.attr.moveX;
        this.position.y += Time.deltaTime * this.attr.moveY;
        this.position.z += Time.deltaTime * this.attr.moveZ;
        this.material.opacity = THREE.Math.clamp(1 - (this.frame / 25), 0, 1);
        if (this.frame >= 25) {
            this.Destroy();
        }
    };
    return Explosion;
}(AnimatedSprite));
var Level1 = /** @class */ (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Level1.prototype.OnLoad = function () {
        return Loader.models.level.clone();
    };
    Level1.prototype.Start = function () {
        this.position.x = 120;
        this.position.y = -18;
        this.position.z = -38;
        this.scale.x = 9;
        this.scale.z = 9;
        this.scale.y = 9;
        this.rotationDeg.y = 0;
    };
    Level1.prototype.Update = function () {
        this.position.x -= Time.deltaTime * 10;
        if (this.position.x < -120) {
            this.Destroy();
        }
    };
    return Level1;
}(Object3D));
var MainPlayer = /** @class */ (function (_super) {
    __extends(MainPlayer, _super);
    function MainPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainPlayer.prototype.OnLoad = function () {
        return Loader.models.SpaceShip;
    };
    MainPlayer.prototype.Start = function () {
        this.attr.moveX = new SmoothDamp();
        this.attr.moveY = new SmoothDamp();
        this.attr.shootTimer = 0;
    };
    MainPlayer.prototype.Update = function () {
        this.attr.shootTimer += Time.deltaTime;
        if (Input.actionA && this.attr.shootTimer > 0.15) {
            var b = new Bullet();
            b.position.set(this.position.x, this.position.y - 0.9, this.position.z);
            Engine.scene.add(b);
            this.attr.shootTimer = 0;
        }
        this.attr.moveX.target = Input.axisX;
        this.attr.moveY.target = Input.axisY;
        this.attr.moveX.Update();
        this.attr.moveY.Update();
        this.rotationDeg.x = 0 - this.attr.moveY.value * 15 * (1 + Math.abs(this.attr.moveX.value));
        this.rotationDeg.y = 90;
        this.position.x = THREE.Math.clamp(this.position.x + this.attr.moveX.value * Time.deltaTime * 20, -28, 28);
        this.position.y = THREE.Math.clamp(this.position.y + this.attr.moveY.value * Time.deltaTime * 20, -15, 15);
    };
    return MainPlayer;
}(Object3D));
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this.camera.position.z = 100;
        _this.camera.near = 95;
        _this.camera.far = 500;
        _this.camera.fov = 20;
        _this.camera.updateProjectionMatrix();
        _this.add(new Level1());
        var light = new THREE.PointLight(0xffffff, 0.5, 500);
        light.position.set(0, 0, 10);
        _this.add(light);
        _this.add(new MainPlayer());
        _this.attr.blockTimer = 0;
        _this.attr.enemyTimer = 0;
        Engine.prewarm = 15;
        _this.attr.paused = false;
        _this.attr.matrix = false;
        _this.attr.guiText = new GuiText();
        _this.attr.guiText.position.x = 10;
        _this.attr.guiText.position.y = 50;
        _this.add(_this.attr.guiText);
        _this.attr.score = 0;
        return _this;
    }
    MainScene.prototype.Start = function () {
        Engine.audio.setBuffer(Loader.sounds.music);
    };
    MainScene.prototype.Update = function () {
        this.attr.blockTimer += Time.deltaTime;
        if (this.attr.blockTimer > 10.7) {
            this.add(new Level1());
            this.attr.blockTimer = 0;
        }
        this.attr.enemyTimer += Time.deltaTime;
        if (this.attr.enemyTimer > 0.5) {
            this.add(new Enemy());
            this.attr.enemyTimer = 0;
        }
        if (Input.click.p) {
            this.attr.paused = !this.attr.paused;
            Time.timeScale = this.attr.paused ? 0 : 1;
        }
        if (Input.click.m) {
            this.attr.matrix = !this.attr.matrix;
            Time.timeScale = this.attr.matrix ? 0.2 : 1;
        }
        this.attr.guiText.text = 'HEALTH: ' + '▓'.repeat(10) + '░'.repeat(5) + '\n\nSCORE: ' + (this.attr.score + 100000000).toString().substr(1) + '\nFPS: ' + Time.fps + (this.attr.paused ? '\nPAUSED' : '') + '\n\nCONTROLS: WASD ⇦ ⇨ ⇧ ⇩\nFIRE: Numpad0 ⇧ ꌷ';
    };
    MainScene.prototype.OnGui = function (gui) {
        if (this.attr.paused) {
            gui.fillStyle = 'rgba(0,0,0,0.5)';
            gui.fillRect(0, 0, Engine.width, Engine.height);
        }
    };
    MainScene = __decorate([
        Load({
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
    return MainScene;
}(Scene));
new Main();

})();