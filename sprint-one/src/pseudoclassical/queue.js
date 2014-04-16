var Queue = function(){
  this._size = 0;
  this._first = null;
  this._last = null;
};


Queue.prototype.enqueue = function(value){
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

Queue.prototype.dequeue = function(){
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

Queue.prototype.size = function(){
  return this._size;
};


