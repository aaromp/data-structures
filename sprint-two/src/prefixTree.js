/* ---- Prefix Tree Class ---- */

var PrefixTree = function() {
  this._nodes = new Node("");
}

PrefixTree.prototype.addWord = function(word) {
  var i, node, letter;
  node = this._nodes;

  for (i = 0; i < word.length; i++) {
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

  var i, node, letter;
  node = this._nodes;

  // track word nodes, initialize with first node 
  nodes = [node];

  for (i = 0; i < word.length; i++) {
    letter = word[i];

    // update the node to it's child letter node
    node = node.getChild(letter);
    nodes.push(node);
  }

  node.isntWord();
  // if the node has children, nothing to delete
  if (node.hasChildren()) return;

  // otherwise delete nodes that aren't a node and have no children and who's preceeding node has only one child.
  for (i = nodes.length - 1; i > 0; i--) {
    // console.log(nodes[i-1].getValue() + " " + nodes[i].getValue());
    if (!nodes[i].hasChildren() && !nodes[i].word() && nodes[i-1].numChildren() === 1) {
      nodes[i-1].removeNode(nodes[i].getValue()); 
    } else {
      nodes[i-1].removeNode(nodes[i].getValue()); 
      return;
    }
  }

  // delete nodes[0][word[0]];
}

PrefixTree.prototype.contains = function(word) {
  var i, letter, node;
  node = this._nodes;

  for (i = 0; i < word.length; i++) {
    letter = word[i];

    if (!node.hasChild(letter)) return false;

    node = node.getChild(letter);
  }

  return node.word();
}

PrefixTree.prototype.isPrefix = function(prefix) {
  var i, letter, node, includeWords;
  node = this._nodes;
  includeWords = arguments[1] === undefined ? true : arguments[1]; // option to not consider words to be prefixes

  // // empty string is included in all prefixes
  // if (prefix.length === 0) return true;

  // if (node === undefined) return false;

  for (i = 0; i < prefix.length; i++) {
    letter = prefix[i];

    if (!node.hasChild(letter)) return false;

    node = node.getChild(letter);
  }

  return includeWords ? true : !node.word();
}

PrefixTree.prototype.getWords = function(prefix) {
  var i, letter, node, words;

  words = [];
  if (!this.isPrefix(prefix)) return words;

  node = this._nodes;

  // update node to last letter node in prefix
  for (i = 0; i < prefix.length; i++) {
    letter = prefix[i];
    node = node.getChild(letter);
  }

  this._getWords(prefix.slice(0, prefix.length - 1), node, words); //slice off by one

  return words;
}

PrefixTree.prototype._getWords = function(prefix, node, results) {
  var nodes;

  prefix = prefix + node.getValue();

  // general case: node represents the end of a word
  if (node.word()) results.push(prefix);

  // base case: node has no children--add it's value to the prefix
  if (!node.hasChildren()) return;  

  // recursive case: node has children--recurse down each node
  for (child in node.getChildren()) {
    this._getWords(prefix, node.getChild(child), results);
  }
}

PrefixTree.prototype.getNodes = function() {
  return this._nodes;
}

PrefixTree.prototype.empty = function() {
  return !this._nodes.hasChildren();
}

/* ---- Node Class ---- */


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

Node.prototype.getChildren = function() {
  return this._children;
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


/* ---- Scrabble Bag Class ---- */


var ScrabbleBag = function() {
  var i, j;
  var letters = [' ','A','B','C','D','E','F','G','H','I','J','K','L','M', 'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var num = [2, 9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1];
  var points = [0, 1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
  var bag = _.zip(letters, num, points);

  // initialize tiles;
  this._tiles = []
  for (i = 0; i < bag.length; i++) {
    for (j = 0; j < bag[i][1]; j++) {
      this._tiles.push(new ScrabbleTile(bag[i][0], bag[i][2]));
    }
  }
}

ScrabbleBag.prototype.getTiles = function(num) {
  var result, i;

  result = [];
  for (i = 0; i < num; i++) {
    result.push(this.getTile());
  }

  return result;
}

ScrabbleBag.prototype.getTile = function() {
  var i;
  i = Math.random() * this.numTiles();

  return this._tiles.splice(i, 1)[0];
}

ScrabbleBag.prototype.numTiles = function() {
  return this._tiles.length;
}

/* ---- Scrabble Tile Class ---- */

var ScrabbleTile = function(letter, points) {
  this.letter = letter;
  this.points = points;
}

/* ---- Scrabble Solver ---- */


var recGetScrabbleWords = function(prefix, node, tiles, results) {
  // base case: prefix is not in the tree,
  var i, tile;

  prefix = prefix + node.getValue();

  // general case: node represents the end of a word
  if (node.word()) results.push(prefix);

  // base case: node has no children
  if (!node.hasChildren()) return;

  // recursive case: node has children--recurse down each node
  for (i = 0; i < tiles.length; i++) {
    tile = tiles.splice(i, 1);
    recGetScrabbleWords(prefix, node.getChild(tile.letter), tiles, results)
  }
}

var getScrabbleSolutions = function(prefixTree, tiles) {
  var i, results, nodes;
  results = [];

  nodes = prefixTree.getNodes();

  recGetScrabbleWords(node.getValue(), nodes[node], tiles, results);

  return results;
}


