var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;
  list.size = 0;

  list.addToTail = function(value){
    var current = makeNode(value);

    if (this.size > 0) {
      this.tail.next = current;
    } else {
      this.head = current;
    }
    this.tail = current;

    this.size++;
  };

  list.removeHead = function(){
    if (this.size > 0) {
      var result = this.head.value;
      this.head = this.head.next;
      if (this.size === 1) {
        this.tail = null;
      }

      this.size--;

      return result;
    }
  };

  list.contains = function(target, node){
    if (node === undefined) node = this.head;
    if (node === null) {
      return false;
    } else if (node.value === target) {
      return true;
    } else {
      return this.contains(target, node.next);
    }
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};
