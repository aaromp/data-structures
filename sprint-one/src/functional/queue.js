var makeQueue = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var size = 0;
  var first = null;
  var last = null;

  // Implement the methods below

  instance.enqueue = function(value){
    var current = {
      value : value,
      next : null
    };
    if (size > 0) {
      last.next = current;
    } else {
      first = current;
    }
    last = current;

    size++;
  };

  instance.dequeue = function(){
    if (size > 0) {
      var result = first.value;
      first = first.next;
      if (size === 1) {
        last = null;
      }

      size--;

      return result;
    }

  };

  instance.size = function(){
    return size;
  };

  return instance;
};
