export function wrongButton(scene,x,y,assetKey) {
    const wrongButton = scene.add.sprite(x,y,assetKey)
        .setInteractive()
        .setOrigin(0.5)
        .setScale(0.3,0.3)
        .on('pointerdown', ()=> {wrongButton.setTint(0xff0000).setAlpha(0.5)
            let wrongText = scene.add.text(400,300,"Wrong!", {
                fontSize: "64px",
                color:"#FF0000",
                fontFamily: 'BadComic-Regular',
            }).setOrigin(0.5);
        })
    return wrongButton;
}

export function correctButton(scene,x,y,assetKey,nextScene) {
    const correctButton = scene.add.sprite(x,y,assetKey)
        .setInteractive()
        .setOrigin(0.5)
        .setScale(0.3,0.3)
        .on('pointerdown', () => {correctButton.setTint(0xff0000).setAlpha(0.5)
            let correctText = scene.add.text(400,300,"Correct!", {
                fontSize: "64px",
                color:"#00ff00",
                fontFamily: 'BadComic-Regular',
            }).setOrigin(0.5);
        scene.time.delayedCall(1500, ()=> {
            correctText.destroy();
            scene.scene.start(nextScene);
        })
        })
        
    return correctButton;
}