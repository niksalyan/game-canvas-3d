declare const Engine, MainScene;

class Main {
    constructor() {
        Engine.Init(1280, 720, true);
        Engine.SetScene(new MainScene());
    }
}