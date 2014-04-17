var makeTree = function(value){
  var newTree = {};
  _.extend(newTree, treeMethods);
  newTree.value = value;
  newTree.children = undefined;
  return newTree;
};


var treeMethods = {};

treeMethods.addChild = function(value){
  var currentTree = makeTree(value);

  if (this.children === undefined) {
    this.children = [currentTree];
  } else {
    this.children.push(currentTree);
  }
};

treeMethods.contains = function(target){
  var containsTarget = function(x) {return x.contains(target);};
  return this.value === target || _.some(this.children || [], containsTarget);
};
