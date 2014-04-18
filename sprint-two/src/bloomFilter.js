

var BloomFilter = function(numBits, numHashFunctions) {
  // initialize bit array with false;
  this._bits = [];
  for (var i = 0; i < numBits; i++) {
    this._bits[i] = false;
  }
  // create an array of numHashFunctions unique hash functions
  this._hashFunctions = [];
  for (var i = 0; i < numHashFunctions; i++) {
    this._hashFunctions[i] = generateHashFunction(numBits);
  }
}

BloomFilter.prototype.add = function(obj) {
  for (var i = 0; i < this._hashFunctions.length; i++) {
    this._bits[this._hashFunctions[i](obj)] = true;
  }
}

BloomFilter.prototype.query = function(obj) {
  for (var i = 0; i < this._hashFunctions.length; i++) {
    if (!this._bits[this._hashFunctions[i](obj)]) {
      return false;
    }
  }
  
  return true;
}

var generateHashFunction = function(max) {
  var p = 1610612741;  // large prime number
  var a = Math.floor(Math.random() * (p/2));
  var b = Math.floor(Math.random() * (p/2));
  
  return function(obj) {
    var string = JSON.stringify(obj);
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
      hash = (hash<<5) + hash + string.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }
    
    return ((a * hash + b) % p) % max;
  }
}
