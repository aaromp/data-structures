var makeBinarySearchTree = function(value){
  var newBST = {};
  _.extend(newBST, BSTMethods);
  newBST.value = value;
  newBST.left = null;
  newBST.right = null;
  return newBST;
};


var BSTMethods = {};

BSTMethods.insert = function(value){
  var target;
  if (value < this.value) {
    target = "left";
  } else if (value > this.value) {
    target = "right";
  } else {
    return;
  }
  if (this[target] === null) {
    this[target] = makeBinarySearchTree(value);
  } else {
    this[target].insert(value);
  }
};

BSTMethods.contains = function(target){
  if (this.value === target) {
    return true;
  } else {
    return (this.left && this.left.contains(target)) ||
           (this.right && this.right.contains(target)) ? true : false;
  }
};

BSTMethods.depthFirstLog = function(func) {
  func(this.value);
  if (this.left) {
    this.left.depthFirstLog(func);
  }
  if (this.right) {
    this.right.depthFirstLog(func);
  }
};
