class AssetManager
  @successCount  = 0
  @errorCount    = 0
  @cache         = {}
  @downloadQueue = []
  @soundsQueue   = []

  @queueDownload: (path) ->
    @downloadQueue.push path

  @queueSound: (id, path) ->
    @soundsQueue.push { id: id, path: path }

  @isDone: ->
    (@downloadQueue.length + @soundsQueue.length) == (this.successCount + this.errorCount)

  @downloadAll: (callback) ->
    callback() if @isDone

    @downloadSounds callback

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

  @getSound: (path) ->
    @cache[path]

  @downloadSounds: (callback) ->
    soundManager.onready =>
      console.log('soundManager ready');
      for sound in @soundsQueue
        @downloadSound sound.id, sound.path, callback

    soundManager.ontimeout ->
      console.log('SM2 did not start');

  @downloadSound: (id, path, callback) ->
    @cache[path] = soundManager.createSound(
      id: id,
      autoLoad: true,
      url: path,
      onload: ->
        console.log(this.url + ' is loaded')
        that.successCount += 1
        callback() if @isDone()
    )
