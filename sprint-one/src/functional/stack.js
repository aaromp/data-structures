var makeStack = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var size = 0; // Hint: set an initial value here
  var top = null;

  // Implement the methods below
  instance.push = function(value){
    size++;
    var current = {
      value: value,
      below : top
    };
    top = current;
  };

  instance.pop = function(){
    if (size > 0) {
      size--;
      var result = top.value;
      top = top.below;
      return result;
    }
  };

  instance.size = function(){
    return size;
  };

  return instance;
};
