declare const Object3D, Loader, Time, Engine;

class Bullet extends Object3D {

    public tag = 'bullet';

    Init() {
        return Loader.models.bullet.clone();
    }

    Start() {
        this.scale.x = 10;
        this.scale.y = 10;
        this.scale.z = 10;
        this.audio.setBuffer(Loader.sounds.shoot);
        this.audio.setVolume(10);
        this.audio.play();
    }

    Update() {
        this.position.x += Time.deltaTime * 100;
        if (this.position.x > 32) {
            this.Destroy();
        }

        if (Engine.scene.list.enemy) {
            Engine.scene.list.enemy.forEach((enemy) => {
                if (this.collision.sphere(enemy)) {
                    this.Destroy();
                    Engine.scene.add(new Explosion(this.position));
                    enemy.applyDamage(1);
                }
            });
        }

    }
}