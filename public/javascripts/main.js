window.SM2_DEFER = true;

// require({
//     paths: {
//         cs: 'lib/cs'
//     }
// }, [
//   'lib/soundmanager2',
//   'javascripts/mantra/util/me.js',
//   // 'cs!javascripts/mantra/util/asset_manager.js'
//   'cs!mantra/util/test'
//   // 'cs!javascripts/mantra/config.js'
// ], function(sm, me, test) {
//   console.log('here');  
//   console.log(Me);
//   console.log(Me.name);
//   console.log('test', test);
//   console.log(test(this));
//   // AssetManager.prepareSoundManager();
// });


require({
  paths: {
    cs: 'lib/cs'
  }
}, [
  // 'lib/soundmanager2',
  'cs!javascripts/mantra/util/asset_manager.js',
  'cs!javascripts/mantra/controls/keyboard.js'
], function(AssetManager, Keyboard) {
  // console.log(AssetManager);
  // console.log(AssetManager);
  // console.log(AssetManager.prepareSoundManager);
  // AssetManager.prepareSoundManager();
  console.log(AssetManager);
  console.log(AssetManager.prepareSoundManager);
});