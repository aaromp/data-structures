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
    deleted = this._recRemove(str.slice(1), next);
  }
  
  // if there hasn't been a deletion and there's  more than one child, delete next's letter
  // if (!deleted) {
  //   if(Object.keys(next).length > 1) { 
  //     deleted = true;
  //     
  //   }
  // } 
  // if (next[nextLetter].isWord) delete next[nextLetter];
   
  return deleted;
}

PrefixTree.prototype._toggleIsWord = function(str, node) {
  var letter = str[0];
  var next = node[letter].next;
  
  // base case: we've reached the last letter in the word, mark the node as not a word
  if (str.length === 1) node[letter].isWord = false;
  // recursive case: we haven't dive deeper then return if a branched node was reached
  else this._recRemove(str.slice(1), next);
}

PrefixTree.prototype.remove = function(word) {
  if (!this.contains(word)) return;
  
  this._toggleIsWord(word, this._storage);
  if(this.isPrefix(word, false)) {
    this._recRemove(word, this._storage, false)
  }
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
  var includeWords = arguments[1] === undefined ? true : arguments[1]; //include words option--defaults to true
  var node = arguments[2] ? arguments[2] : this._storage;
  
  // base case: the letter does not exist in the prefix tree, return false
  if (node[letter] === undefined) return false;
  
  // base case: last character reached, indicate if prefix
  if (str.length === 1) {
    return includeWords ? true : !node[letter].isWord;
  }
  
  // base case: the next letter node is empty, so return false
  if (Object.keys(node[letter].next).length === 0) return false;
  
  // recursive case: look into the next letter and return
  return this.isPrefix(str.slice(1), includeWords, node[letter].next);
}

PrefixTree.prototype.getWords = function(prefix) {
  
}