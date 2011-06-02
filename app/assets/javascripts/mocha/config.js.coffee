soundManager.url = root.asset_path
soundManager.flashVersion = 9
soundManager.debugFlash = false
soundManager.debugMode = false
soundManager.defaultOptions.volume = 5

$em            = EventManager.instance()
$logger        = Logger.instance()
$audio_manager = AudioManager.instance()

$logger.registerSubsystem 'global'
$logger.registerSubsystem 'sound'
$logger.registerSubsystem 'assets'
$logger.registerSubsystem 'input'
$logger.registerSubsystem 'game'

# Levels, in increasing order of verbosity: off, error, warn, info, debug
$logger.levels {
  global: 'debug'
  sound:  'warn'
  assets: 'info'
  input:  'info'
  game:   'info'
}