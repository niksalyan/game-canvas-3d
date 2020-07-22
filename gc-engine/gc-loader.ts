import {THREE} from "./THREE";

function LoadDecorator(config: any) {
    Loader.Load(config.path, config.resources);
}

export const Load: any = LoadDecorator;

export class Loader {

    public static maxProgress: number = 0;

    public static path: string;

    public static loading: number = 0;

    public static objectLoader = new THREE.ObjectLoader();
    public static textureLoader = new THREE.TextureLoader();
    public static audioLoader = new THREE.AudioLoader();

    public static models: any = {};
    public static textures: any = {};
    public static materials: any = {};
    public static sounds: any = {};

    public static get progress(): number {
        if (Loader.loading > 0) {
            if (Loader.loading > Loader.maxProgress) {
                Loader.maxProgress = Loader.loading;
            }
            return Math.round(100 / Loader.maxProgress * (Loader.maxProgress - Loader.loading));
        } else {
            Loader.maxProgress = 0;
            return 100;
        }
    }

    public static Load(path, list) {
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

    public static loadModel(file: string) {
        const name = Loader.getFileBaseName(file);
        if (Loader.models[name]) {
            return;
        }
        /* Not yet implemented
        if (typeof Data !== 'undefined' && Data && Data[name]) {
            Loader.models[name] = Loader.objectLoader.parse(Data[name]);
            return;
        }
        */
        Loader.loading++;
        Loader.objectLoader.load(file, (model) => {
            Loader.models[name] = model;
            Loader.loading--;
        });
    }

    public static loadTexture(file: string) {
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

    public static loadSound(file: string) {
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

    public static getFileExtension(file: string) {
        const parts: string[] = (file || '').split('.');
        return parts[parts.length - 1].toLowerCase();
    }

    public static getFileName(file: string) {
        const lastIndex: number = (file || '').lastIndexOf('/');
        return lastIndex !== -1 ? file.substr(lastIndex + 1) : file;
    }

    public static getFileBaseName(file: string) {
        file = Loader.getFileName(file || '');
        const lastIndex: number = file.lastIndexOf('.');
        return lastIndex !== -1 ? file.substr(0, lastIndex) : file;
    }
}