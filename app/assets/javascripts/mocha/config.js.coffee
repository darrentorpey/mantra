soundManager.url = root.asset_path
soundManager.flashVersion = 9
soundManager.debugFlash = false
soundManager.debugMode = false
soundManager.defaultOptions.volume = 10

$em = EventManager.instance()
$logger = Logger.instance()

$logger.registerSubsystem 'global'
$logger.registerSubsystem 'sound'
$logger.registerSubsystem 'assets'
$logger.registerSubsystem 'game'

$logger.levels {
  global: 'debug'
  sound:  'debug'
  assets: 'debug'
  game:   'off'
}

# $logger.global.debug "Here's the world: #{'6'}"
# $logger.global.info  'Hi, global'
# $logger.global.warn  'WARNING: The globe is warming'
# $logger.global.error "FAIL: the world is dead"

# $logger.assets.debug 'All assets so far: []'
# $logger.assets.info  'Hi, assets are okay'
# $logger.assets.warn  'Be careful of assets'
# $logger.assets.error 'BAD asset failure!'