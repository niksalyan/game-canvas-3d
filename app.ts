import {Engine} from "./gc-engine/gc-engine";
import {MainScene} from "./src/main-scene";

class App {
    constructor() {
        Engine.Init(1280, 720, true);
        Engine.SetScene(new MainScene());
    }
}

new App();