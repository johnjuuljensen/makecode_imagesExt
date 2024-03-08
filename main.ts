controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    rotate(1)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(-1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(1)
})
function rotate (amount: number) {
    rot += amount
    mySprite.setImage(imagesExt.rotate(imagesExt.RotationType.ShearRotate, rot, myImage))
    mySprite.sayText(rot)
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    rotate(-1)
})
let mySprite: Sprite = null
let myImage: Image = null
let rot = 0
scene.setBackgroundImage(storySprites.world)
rot = 0
myImage = assets.image`box`
mySprite = sprites.create(myImage, SpriteKind.Player)
game.onUpdateInterval(500, function () {
    if (controller.A.isPressed()) {
        rot += 1
    }
})
