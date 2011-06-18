root = global ? window

AssetManager.configureSoundManager root.asset_path

# Setup our handy-dandy convenience variables
root.$em            = null
root.$logger        = null
root.$audio_manager = null