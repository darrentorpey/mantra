# Make a consistent reference for the root element root object.
# It will be equivalent to 'window' for browser-land, and 'global' for Node.js
root = global ? window
root.root = root
root.asset_path = '/mantra/'
root.Mantra = {}
root.EBF = {}

# Setup our handy-dandy "global" variables (for convenience purposes)
root.$em            = null
root.$logger        = null
root.$audio_manager = null