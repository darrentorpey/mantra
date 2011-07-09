class Mantra.KeyManager
  @capture_keypresses: (@game, steal = 'basic') ->
    window.keydown = {}
    $ =>
      $(document).bind 'keydown', (event) =>
        keydown[@keyName(event)] = true
        @hasMod(event) || !steal

      $(document).bind 'keyup', (event) =>
        key      = String.fromCharCode event.which
        key_name = @keyName event
        keydown[key_name] = false
        $logger.input.debug "Key pressed: '#{key}' (#{key_name})"
        @game.onKey key if @game
        @hasMod(event) || !steal

  @keyName = (event) ->
    $.hotkeys.specialKeys[event.which] || String.fromCharCode(event.which).toLowerCase()
  
  @hasMod = (event) ->
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey