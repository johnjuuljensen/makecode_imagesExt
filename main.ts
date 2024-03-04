
let rot = 0
let myImage = assets.image`box`

let mySprite = sprites.create(myImage, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(2,4));

controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)

function rotate(amount: number) {
    rot += amount
    mySprite.setImage(imagesExt.rotate(imagesExt.RotationType.ShearRotate, rot, myImage))
    mySprite.sayText(`${rot}`)
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(-1);
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    rotate(-1);
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(1);
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    rotate(1);
})
