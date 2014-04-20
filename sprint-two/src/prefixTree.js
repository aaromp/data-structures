var PrefixTree = function() {
  this._nodes = {};
}

PrefixTree.prototype.addWord = function(word) {
  var i, node, letter;
  letter = word[0];

  // initialize, prefix tree if necessary
  if (this._nodes[letter] === undefined) this._nodes[letter] = new Node(letter);
  node = this._nodes[letter];

  for (i = 1; i < word.length; i++) {
    letter = word[i];

    // if the node isn't in the prefix tree, add it
    if (!node.hasChild(letter)) node.addNode(letter);

    // update the node to it's child letter node
    node = node.getChild(letter);
  }

  node.isWord();
}

PrefixTree.prototype.removeWord = function(word) {
  // if the word is not contained in the tree, do nothing
  if (!this.contains(word)) return;

  var i, node, letter, lastWord, tmp;
  letter = word[0];
  node = this._nodes[letter];

  // track word nodes, initialize with first node 
  nodes = [this._nodes, node];

  for (i = 1; i < word.length; i++) {
    letter = word[i];
    
    // if the node isn't in the prefix tree, add it
    if (!node.hasChild(letter)) node.addNode(letter);

    // update the node to it's child letter node
    node = node.getChild(letter);
    nodes.push(node);
  }

  node.isntWord();
  // if the node has children, nothing to delete
  if (node.hasChildren()) return;

  // otherwise delete nodes that aren't a node and have no children and who's preceeding node has only one child.
  for (i = nodes.length - 1; i > 1; i--) {
    if (!nodes[i].hasChildren() && !nodes[i].word() && nodes[i-1].numChildren() === 1) {
      nodes[i-1].removeNode(nodes[i].getValue()); 
    } else {
      nodes[i-1].removeNode(nodes[i].getValue()); 
      return;
    }
  }

  delete nodes[0][word[0]];
}

PrefixTree.prototype.contains = function(word) {
  var i, letter, node;
  letter = word[0];
  node = this._nodes[letter]
  if (node === undefined) return false;

  for (i = 1; i < word.length; i++) {
    letter = word[i];

    if (!node.hasChild(letter)) return false;

    node = node.getChild(letter);
  }

  return node.word();
}

PrefixTree.prototype.isPrefix = function(prefix) {
  var i, letter, node, includeWords;
  letter = prefix[0];
  node = this._nodes[letter]
  includeWords = arguments[1] === undefined ? true : arguments[1]; // option to not consider words to be prefixes

  // empty string is included in all prefixes
  if (prefix.length === 0) return true;

  if (node === undefined) return false;

  for (i = 1; i < prefix.length; i++) {
    letter = prefix[i];

    if (!node.hasChild(letter)) return false;

    node = node.getChild(letter);
  }

  return includeWords ? true : !node.word();
}

PrefixTree.prototype.getWords = function(prefix) {
  var i, letter, node, words;
  letter = prefix[0];
  node = this._nodes[letter];
  words = [];

  // empty string is included in all prefixes
  if (prefix.length === 0) return true;

  if (node === undefined) return false;

  for (i = 1; i < prefix.length; i++) {
    letter = prefix[i];

    if (!node.hasChild(letter)) return false;

    node = node.getChild(letter);
  }

  return includeWords ? true : !node.word();
}


var Node = function(value) {
	this._value = value;
	this._word = false;
	this._children = null;
}

Node.prototype.getValue = function() {
  return this._value;
}

Node.prototype.word = function() {
  return this._word;
}

Node.prototype.isWord = function() {
  this._word = true;
}

Node.prototype.isntWord = function() {
  this._word = false;
}

Node.prototype.hasChild = function(value) {
  if (this._children === null) return false;
	return this._children[value] !== undefined;
}

Node.prototype.hasChildren = function() {
  return this._children !== null;
}

Node.prototype.addNode = function(value) {
	// if node is not contained in children, initialize it with an object
	if (this._children === null) this._children = {};
	// add the node to children
	this._children[value] = new Node(value);
}

Node.prototype.removeNode = function(value) {
	if (this.hasChild(value)) {
    delete this._children[value];
    if (Object.keys(this._children).length === 0) {
      this._children = null;
    }
  }
}

Node.prototype.numChildren = function() {
  if (this._children === null) return 0;
  return Object.keys(this._children).length;
}

Node.prototype.getChild = function(value) {
  if (this.hasChild(value)) return this._children[value];
}


