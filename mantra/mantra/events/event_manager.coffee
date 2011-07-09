class Mantra.EventManager
  constructor: ->
    @types = { 'alien::spawn' : [] }
    @queues = [[], []]
    @current_queue = @queues[0]

  listen: (type, obj, callback) ->
    (@types[type] ?= []).push listener: obj, callback: callback

  signal: (type, data) ->
    @current_queue.push type: type, data: data

  sendSignals: ->
    trigger signal.type, signal.data for signal in @current_queue

  trigger: (type, data) ->
    callback.callback.apply(callback.listener, [data]) for callback in (@types[type] ?= [])

  @instance: ->
    @singleton ?= new Mantra.EventManager