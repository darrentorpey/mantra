root = global ? window

soundManager.url                   = '/javascripts/lib/'
soundManager.flashVersion          = 9
soundManager.debugFlash            = false
soundManager.debugMode             = false
soundManager.defaultOptions.volume = 5
soundManager.ontimeout ->
  console.log "SM2 could not start. Flash blocked, missing or security error? Complain, etc.?"
soundManager.onready ->
  console.log "SM2 ready"

$em            = null
$logger        = null
$audio_manager = null