var EventManager;
EventManager = (function() {
  function EventManager() {
    this.types = {
      'alien::spawn': []
    };
    this.queues = [[], []];
    this.current_queue = this.queues[0];
  }
  EventManager.prototype.listen = function(type, obj, callback) {
    var _base, _ref;
    return ((_ref = (_base = this.types)[type]) != null ? _ref : _base[type] = []).push({
      listener: obj,
      callback: callback
    });
  };
  EventManager.prototype.signal = function(type, data) {
    return this.current_queue.push({
      type: type,
      data: data
    });
  };
  EventManager.prototype.sendSignals = function() {
    var signal, _i, _len, _ref, _results;
    _ref = this.current_queue;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      signal = _ref[_i];
      _results.push(trigger(signal.type, signal.data));
    }
    return _results;
  };
  EventManager.prototype.trigger = function(type, data) {
    var callback, _base, _i, _len, _ref, _ref2, _results;
    _ref2 = ((_ref = (_base = this.types)[type]) != null ? _ref : _base[type] = []);
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      callback = _ref2[_i];
      _results.push(callback.callback.apply(callback.listener, [data]));
    }
    return _results;
  };
  EventManager.instance = function() {
    var _ref;
    return (_ref = this.singleton) != null ? _ref : this.singleton = new EventManager;
  };
  return EventManager;
})();