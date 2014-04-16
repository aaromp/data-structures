var makeQueue = function(){
  var instance = {};
  extend(instance, queueMethods);
  return instance;
};

var extend = function(to, from){
  for (var key in from){
    to[key] = from[key];
  }
};

var queueMethods = {};

queueMethods.enqueue = function(value){
  var current = {
    value : value,
    next : null
  };
  if (this._size > 0) {
    this._last.next = current;
  } else {
    this._first = current;
  }
  this._last = current;

  this._size++;
};

queueMethods.dequeue = function(){
  if (this._size > 0) {
    var result = this._first.value;
    this._first = this._first.next;
    if (this._size === 1) {
      this._last = null;
    }

    this._size--;

    return result;
  }

};

queueMethods.size = function(){
  return this._size;
};

queueMethods._size = 0;
queueMethods._first = null;
queueMethods._last = null;
