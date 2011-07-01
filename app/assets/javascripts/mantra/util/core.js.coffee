# Grab our root element root object. 'window' for browser-land, 'global' for Node.js
root = global ? window
root.asset_path = '/assets/'
root.Mantra = {}

# Setup our handy-dandy "global" variables (for convenience purposes)
root.$em            = null
root.$logger        = null
root.$audio_manager = null