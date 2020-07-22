
export class Input {
    public static key: any = {};
    public static click: any = {};
    private static inkeyCache: string = null;

    public static inkey: string = '';

    public static mouse = null;

    public static Init() {
        document.addEventListener('keydown', Input.keyEvent, false);
        document.addEventListener('keyup', Input.keyEvent, false);

        Engine.guiContainer.addEventListener('mousedown', Input.mouseEvent, false);
        Engine.guiContainer.addEventListener('mouseup', Input.mouseEvent, false);
        Engine.guiContainer.addEventListener('mouseover', Input.mouseEvent, false);
        Engine.guiContainer.addEventListener('mouseout', Input.mouseEvent, false);
        Engine.guiContainer.addEventListener('mousemove', Input.mouseEvent, false);
    }

    public static get axisX(): number {
        return (Input.key.ArrowLeft || Input.key.KeyA ? -1 : 0) + (Input.key.ArrowRight || Input.key.KeyD ? 1 : 0);
    }

    public static get axisY(): number {
        return (Input.key.ArrowDown || Input.key.KeyS ? -1 : 0) + (Input.key.ArrowUp || Input.key.KeyW ? 1 : 0);
    }

    public static get actionA(): boolean {
        return Input.key.Numpad0 || Input.key.ShiftLeft || (Input.mouse && Input.mouse.Button0);
    }

    public static get actionB(): boolean {
        return Input.key.NumpadDecimal || Input.key.KeyZ || (Input.mouse && Input.mouse.button2);
    }

    public static get actionC(): boolean {
        return Input.key.NumpadEnter || Input.key.KeyX || (Input.mouse && Input.mouse.button1);
    }

    public static get axisX1(): number {
        return (Input.key.KeyA ? -1 : 0) + (Input.key.KeyD ? 1 : 0);
    }

    public static get axisY1(): number {
        return (Input.key.KeyS ? -1 : 0) + (Input.key.KeyW ? 1 : 0);
    }

    public static get actionA1(): boolean {
        return Input.key.ShiftLeft || Input.key.KeyG;
    }

    public static get actionB1(): boolean {
        return Input.key.KeyZ || Input.key.KeyH;
    }

    public static get actionC1(): boolean {
        return Input.key.KeyX || Input.key.KeyJ;
    }

    public static get axisX2(): number {
        return (Input.key.ArrowLeft ? -1 : 0) + (Input.key.ArrowRight ? 1 : 0);
    }

    public static get axisY2(): number {
        return (Input.key.ArrowDown ? -1 : 0) + (Input.key.ArrowUp ? 1 : 0);
    }

    public static get actionA2(): boolean {
        return Input.key.Numpad0;
    }

    public static get actionB2(): boolean {
        return Input.key.NumpadDecimal;
    }

    public static get actionC2(): boolean {
        return Input.key.NumpadEnter;
    }


    public static keyEvent(evt: any) {
        switch (evt.type) {
            case 'keydown':
                Input.key[evt.code] = true;
                Input.inkey = evt.key.length === 1 ? Input.inkey + evt.key : (evt.keyCode === 8 ? Input.inkey.slice(0, -1) : Input.inkey);
                break;
            case 'keyup':
                delete Input.key[evt.code]];
                Input.click[evt.code] = true;
                break;
        }
    }

    public static mouseEvent(evt: any) {
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
                let rect = Engine.guiContainer.getBoundingClientRect();
                Input.mouse.x = Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * Engine.guiContainer.width);
                Input.mouse.y = Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * Engine.guiContainer.height);
                break;
        }
    }

    public static Update() {
        for (const prop of Object.getOwnPropertyNames(Input.click)) {
            delete Input.click[prop];
        }
    }

}
