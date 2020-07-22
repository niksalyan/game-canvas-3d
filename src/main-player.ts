class MainPlayer extends Object3D {
    OnLoad() {
        return Loader.models.SpaceShip;
    }

    Start() {
        this.attr.moveX = new SmoothDamp();
        this.attr.moveY = new SmoothDamp();
        this.attr.shootTimer = 0;
    }

    Update() {
        this.attr.shootTimer += Time.deltaTime;

        if (Input.actionA && this.attr.shootTimer > 0.15) {
            let b = new Bullet();
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

    }

    


}