import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';

export class LevelOneScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELONE_SCENE,
            }
        );
    }

    init() {

    }


    create(){
        const screenWidth = this.scale.width / this.textures.get('polarkidsleeping').getSourceImage().width;
        const screenHeight = this.scale.height / this.textures.get('polarkidsleeping').getSourceImage().height;
        const newScale = Math.max(screenWidth, screenHeight)
        this.add.image(0,0,'polarkidsleeping').setOrigin(0).setScale(newScale).setDepth(0);

        const sleep = this.add.text(120, 200,'theres supposed to be the kid sleeping but i scaled it wrong', {
                fontFamily: 'BadComic-Regular',
                color: 'white',
                fontSize: '20px',
        }).setDepth(2);
}

}
