var Canvas;
Canvas = (function() {
  function Canvas() {}
  Canvas.create_canvas = function() {
    return this.j_createCanvas().prependTo('body').get(0);
  };
  Canvas.j_createCanvas = function() {
    return $('<canvas>').attr({
      id: 'game_surface',
      width: '800',
      height: '600'
    }).css({
      'background-color': 'black',
      margin: '0px auto',
      display: 'block'
    });
  };
  return Canvas;
})();