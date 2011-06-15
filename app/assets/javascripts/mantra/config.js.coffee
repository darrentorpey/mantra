soundManager.url                   = root.asset_path
soundManager.flashVersion          = 9
soundManager.debugFlash            = false
soundManager.debugMode             = false
soundManager.defaultOptions.volume = 5

$em            = EventManager.instance()
$logger        = Logger.instance()
$audio_manager = AudioManager.instance()

$logger.registerSubsystem 'global'
$logger.registerSubsystem 'sound'
$logger.registerSubsystem 'assets'
$logger.registerSubsystem 'input'
$logger.registerSubsystem 'game'