var Stack = function() {
  this._size = 0;
  this._top = null;
};

Stack.prototype.push = function(value){
  this._size++;
  var current = {
    value: value,
    below : this._top
  };
  this._top = current;
};

Stack.prototype.pop = function(){
  if (this._size > 0) {
    this._size--;
    var result = this._top.value;
    this._top = this._top.below;
    return result;
  }
};

Stack.prototype.size = function(){
  return this._size;
};
