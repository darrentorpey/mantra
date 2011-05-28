class AssetManager
  @successCount  = 0
  @errorCount    = 0
  @cache         = {}
  @downloadQueue = []
  @soundsQueue   = []
  @asset_lookup  = {}

  @queueImage: (path) ->
    @downloadQueue.push path

  @queueSound: (id, path) ->
    @soundsQueue.push { id: id, path: path }

  @totalAssets: ->
    @downloadQueue.length + @soundsQueue.length

  @numFinished: ->
    @successCount + @errorCount

  @getProgress: ->
    if @totalAssets() == 0 then '0' else ((@numFinished() / @totalAssets()) * 100).toString()[0..3]

  @isDone: =>
    @totalAssets() == (@successCount + @errorCount)

  @downloadAll: (callback) ->
    callback() if @downloadQueue.length == 0 && @soundsQueue.length == 0

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

  @getBackgroundSong: (id) ->
    @asset_lookup[id]

  @downloadSounds: (callback) ->
    return unless soundManager
    soundManager.onready =>
      $logger.sound.info 'SoundManager ready'
      @downloadSound sound.id, sound.path, callback for sound in @soundsQueue

    soundManager.ontimeout ->
      $logger.sound.error 'SM2 did not start'

  @downloadSound: (id, path, callback) ->
    manager = @
    @cache[path] = soundManager.createSound
      id: id,
      autoLoad: true,
      url: path,
      onload: ->
        $logger.assets.info this.url + "#{@url} is loaded"
        manager.successCount += 1
        callback() if manager.isDone()
    @cache[path].restart = ->
      $logger.sound.info "Restarting '#{@sID}'"
      @stop()
      @setPosition 0
      @play()
    @asset_lookup[id] = @cache[path]
