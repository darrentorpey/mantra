class AssetManager
  @successCount  = 0
  @errorCount    = 0
  @cache         = {}
  @downloadQueue = []

  @queueDownload: (path) ->
    @downloadQueue.push(path)

  @isDone: ->
    (this.downloadQueue.length == this.successCount + this.errorCount)

  @downloadAll: (callback) ->
    for i in [0...@downloadQueue.length]
      @path = this.downloadQueue[i]
      @img = new Image()
      @img.addEventListener('load', =>
        @successCount += 1
        if @isDone()
          callback()
      )

      @img.addEventListener 'error', =>
        @errorCount += 1
        if @isDone()
          callback()

      @img.src = @path
      @cache[@path] = @img

  @getAsset: (name) ->  
    @cache[name]