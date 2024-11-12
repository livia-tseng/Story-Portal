import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';

export class GameStartScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_START_SCENE,
            }
        );
    }

    preload() {
        
    }

    create(){

    }
}
