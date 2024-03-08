let mySprite: Sprite = null
let myImage: Image = null
scene.setBackgroundImage(storySprites.world)
myImage = assets.image`box`
mySprite = sprites.create(myImage, SpriteKind.Player)
mySprite.setBounceOnWall(true)
mySprite.fx = 10
mySprite.fy = 10
imagesExt.moveSpriteAngular(mySprite, myImage, 100, 10, 10, 90);


