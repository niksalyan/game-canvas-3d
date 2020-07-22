import {Engine} from "./gc-engine/gc-engine";
import {Level} from "./src/level";

class App {
    constructor() {
        Engine.Init(1280, 720, true);
        Engine.SetScene(new Level());
    }
}

new App();