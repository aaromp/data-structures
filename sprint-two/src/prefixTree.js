var PrefixTree = function() {
  this._storage = {};
}

PrefixTree.prototype.add = function(str) {
  // this._recAdd(word, this._storage);
  var node = arguments[1] ? arguments[1] : this._storage;
  
  // base case: empty string--nothinig to add.
  if (str.length === 0) return;
  
  var letter = str[0];
  if (node === null) node = {};
  // if the node doesn't have the current letter node, add it.
  if (node[letter] === undefined) {
    node[letter] = {};
    node[letter].value = letter;
    node[letter].isWord = false;
    node[letter].next = {};
  } 
  // base case: we've reached the end of the string, indicate that node represents the end of a word.
  if (str.length === 1) {
    node[letter].isWord = true;
  } 
  // recursive case: we haven't reached the end of the string, recurse to add the next letter.
  else {
    this.add(str.slice(1), node[letter].next);
  }
}

PrefixTree.prototype._recRemove = function(str, node, deleted) {
  var letter = str[0];
  var nextLetter = str[1];
  var next = node[letter].next;
  
  // base case: we've reached the last letter in the word, mark the node as not a word
  if (str.length === 1) {
    node[letter].isWord = false;
    return false
  } 
  // recursive case: we haven't dive deeper then return if a branched node was reached
  else {
    deleted = this._recRemove(str.slice(1), node[letter].next);
  }
  
  if (!deleted) {
    // if there hasn't been a deletion at a node with more than one child and
    // if next node is not word, delete next letter letter node
    if (Object.keys(node[letter].next).length > 1 || node[letter].next[nextLetter].isWord) { //
      deleted = true;
    }
    
    if (!this.isPrefix(str)) {
      console.log("removing: " + node[letter].next[nextLetter].value);
      console.log("prefix is: " + str);
      delete node[letter].next[nextLetter];
    }
    
    
    // 
    // if (!node[letter].next[nextLetter].isWord) {
    //   
    //  }
   }
   
  return deleted;
}

PrefixTree.prototype.remove = function(word) {
  if (!this.contains(word)) return;
  this._recRemove(word, this._storage, false);
}

PrefixTree.prototype.contains = function(str) {
  // base case: if the string is empty, the word not contained in the prefix tree
  if (str.length === 0) return false;
  
  var letter = str[0];
  var node = arguments[1] ? arguments[1] : this._storage;
  
  // base case: the letter does not exist in the prefix tree, return false
  if (node[letter] === undefined) return false;
  
  // base case: if we're on the last character and the node indicates that we've reached the end of a word,
  // return true
  if (str.length === 1) return node[letter].isWord;
  
  // base case: the next letter node is empty, so return false
  if (Object.keys(node[letter].next).length === 0) return false;
  
  // recursive case: look into the next letter and return
  return this.contains(str.slice(1), node[letter].next);
}

PrefixTree.prototype.isPrefix = function(str) {
  // base case: if the string is empty, the word not contained in the prefix tree
  if (str.length === 0) return true;
  
  var letter = str[0];
  var node = arguments[1] ? arguments[1] : this._storage;
  
  // base case: the letter does not exist in the prefix tree, return false
  if (node[letter] === undefined) return false;
  
  // base case: if we're on the last character and the node indicates that we've reached the end of a word,
  // return true
  if (str.length === 1) return true;
  
  // base case: the next letter node is empty, so return false
  if (Object.keys(node[letter].next).length === 0) return false;
  
  // recursive case: look into the next letter and return
  return this.isPrefix(str.slice(1), node[letter].next);
}

PrefixTree.prototype.getWords = function(prefix) {
  
}