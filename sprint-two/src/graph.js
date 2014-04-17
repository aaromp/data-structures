var Graph = function(){
  this._storage = {};
};

Graph.prototype.addNode = function(newNode, toNode){
  if (Object.keys(this._storage).length === 1) {
    toNode = Object.keys(this._storage)[0];
  }
  this._storage[newNode] = {};
  if (toNode !== undefined) {
    this.addEdge(newNode, toNode);
  }
};

Graph.prototype.contains = function(node){
  return this._storage[node] !== undefined;
};

Graph.prototype.removeNode = function(node){
  for (var connectedNode in this._storage[node]) {
    this.removeEdge(node, connectedNode);
  }
  delete this._storage[node];
};

Graph.prototype.getEdge = function(fromNode, toNode){
  return this._storage[fromNode][toNode] ? true : false;
};

Graph.prototype.addEdge = function(fromNode, toNode){

  this._storage[fromNode][toNode] = true;
  this._storage[toNode][fromNode] = true;
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  delete this._storage[fromNode][toNode];
  delete this._storage[toNode][fromNode];
  for (var i = 0; i < arguments.length; i++) {
    if (isEmpty(this._storage[arguments[i]])) {
      delete this._storage[arguments[i]];
    }
  }
};

var isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}
