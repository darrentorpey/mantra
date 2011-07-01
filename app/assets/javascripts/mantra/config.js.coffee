# Make a consistent reference for the root element root object.
# It will be equivalent to 'window' for browser-land, and 'global' for Node.js
root = global ? window

# Setup the sound manager. Right now this uses SoundManager 2.
# Yes, it's Flash... so sue me.
AssetManager.configureSoundManager root.asset_path