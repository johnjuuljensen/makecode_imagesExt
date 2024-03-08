let mySprite: Sprite = null
let myImage: Image = null
scene.setBackgroundImage(storySprites.world)
myImage = assets.image`box`
mySprite = sprites.create(myImage, SpriteKind.Player)
mySprite.setBounceOnWall(false)
mySprite.setStayInScreen(true)
mySprite.fx = 10
mySprite.fy = 10
imagesExt.moveSpriteAngular(mySprite, assets.image`box`)
