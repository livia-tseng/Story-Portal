import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './sceneKeys.js';
import { effectOnClick } from '../buttonHelper.js';
import { wrongButton } from '../buttonHelper.js';
import { correctButton } from '../buttonHelper.js';

//NEED TO IMPORT SCENE_KEYS AND MAIN.JS
export class LevelDraggableScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LEVELDRAGGABLE_SCENE,
            }
        );
    }

    init() {

    }

    create() {
        const screenWidth = 800 / this.textures.get('dragBackground').getSourceImage().width;
        const screenHeight = 600 / this.textures.get('dragBackground').getSourceImage().height;
        this.add.image(0,0, 'dragBackground').setOrigin(0).setScale(screenWidth, screenHeight).setDepth(0);

        let ameen = this.add.image(700, 100, 'ameenDrag').setOrigin(0.5).setScale(0.3).setDepth(1);


        //Back Button Stuff
        const backButton = this.add.image(0, 0, 'mediumButton').setDepth(2);
        const backText = this.add.text(0, 0, 'BACK',
            {
                fontFamily: 'BadComic-Regular',
                color: '#D3D3D3',
                fontSize: '60px',
        }).setOrigin(0.5, 0.7).setDepth(2);
        //Container!
        const containerBackButton = this.add.container(backButton.width/2, 600 - (backButton.height/2), [backButton, backText]).setDepth(2);
        containerBackButton.setSize(backButton.width, backButton.height);
        containerBackButton.setInteractive();
        containerBackButton.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(SCENE_KEYS.GAME_START_SCENE);
        });

        let question = this.add.text(400, 200, 'Drag Here',
            {
                fontFamily: 'Goudy',
                color: 'black',
                fontSize: '60px',
        }).setOrigin(0.5).setDepth(1);

        const graphics = this.add.graphics();
        let dropZoneRadius = 100;
        const zone = this.add.zone(400, 300, 100, 100)
        .setCircleDropZone(dropZoneRadius) // Make it a circular drop zone
        .setInteractive();

        graphics.lineStyle(2, 0x0000ff);
        graphics.strokeCircle(400, 300, dropZoneRadius/2);

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            gameObject.setTint(0x00ff00); // Change tint to indicate successful drop
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled = false;
        });


        //Stars on Click!
        effectOnClick(this);

        ameen.setInteractive();
        this.input.setDraggable(ameen);
        ameen.on('pointerover', () => {
            ameen.setTint(0xD3D3D3);
        })
        ameen.on('pointerout', () => {
            ameen.clearTint();
        })

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
        
    }
}