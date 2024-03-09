scene.setBackgroundImage(storySprites.world)
let myImage = assets.image`box`
let mySprite = sprites.create(myImage, SpriteKind.Player)
mySprite.setBounceOnWall(false)
mySprite.setStayInScreen(true)
mySprite.fx = 10
mySprite.fy = 10
imagesExt.moveSpriteAngular(mySprite, assets.image`box`)
