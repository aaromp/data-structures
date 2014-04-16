var makeStack = function() {
  var instance = {};
  extend(instance, stackMethods);
  return instance;
};

var extend = function(to, from){
  for (var key in from){
    to[key] = from[key];
  }
};

var stackMethods = {};

stackMethods.push = function(value){
  this._size++;
  var current = {
    value: value,
    below : this._top
  };
  this._top = current;
};

stackMethods.pop = function(){
  if (this._size > 0) {
    this._size--;
    var result = this._top.value;
    this._top = this._top.below;
    return result;
  }
};

stackMethods.size = function(){
  return this._size;
};

stackMethods._size = 0;
stackMethods._top = null;
