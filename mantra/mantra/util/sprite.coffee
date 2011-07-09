class Sprite
  @rotateAndCache: (image, angle) ->
    offscreenCanvas = document.createElement 'canvas'
    size            = Math.max image.width, image.height
    offscreenCanvas.width  = size
    offscreenCanvas.height = size
    offscreenCtx           = offscreenCanvas.getContext '2d'
    offscreenCtx.translate size/2, size/2
    offscreenCtx.rotate angle + Math.PI/2
    offscreenCtx.drawImage image, -(image.width/2), -(image.height/2)
    offscreenCanvas

root.Sprite = Sprite