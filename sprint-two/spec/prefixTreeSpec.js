var expect = chai.expect;
var assert = chai.assert;

describe("prefixTree", function() {
  var prefixTree;
  var shortScrabbleLibrary = ["ABSTRACT",
  "AMBASSADOR",
  "ARBITRARY",
  "AUGMENTATION",
  "BESTOWAL",
  "BRUSHY",
  "BUOY",
  "CAPITULATE",
  "CHANCERY",
  "CHIEF",
  "CHIGGER",
  "CLUE",
  "COFACTOR",
  "COLLEAGUE",
  "CONNOISSEUR",
  "CONVOLUTE",
  "COTILLION",
  "COUNTERFEIT",
  "DECEITFUL",
  "DEHYDRATE",
  "DISPEL",
  "DOWNCAST",
  "ELEGIAC",
  "EMANATE",
  "FAERY",
  "FATTY",
  "FLICK",
  "FOYER",
  "GLEAN",
  "GNOME",
  "GUSH",
  "HALIBUT",
  "HUBBUB",
  "IDIOT",
  "IMP",
  "IRRITANT",
  "JAUNTY",
  "JUNK",
  "KEYHOLE",
  "LAVATORY",
  "LOFT",
  "MANATEE",
  "MESSY",
  "MILORD",
  "MISCELLANY",
  "MUON",
  "NADIR",
  "NEON",
  "OBSESS",
  "OCULAR",
  "ONYX",
  "POMP",
  "PROSODY",
  "PUEBLO",
  "QUAGMIRE",
  "QUIET",
  "REEF",
  "RELIC",
  "RIVAL",
  "SCALD",
  "SIMULTANEITY",
  "SLITHER",
  "SONIC",
  "SPHERIC",
  "SQUIRMY",
  "SUCCUMB",
  "THEREIN",
  "TROUGH",
  "WALLABY",
  "WARE",
  "WOODY",
  "YOURSELF",
  "ZIRCON"]

  beforeEach(function() {
    prefixTree = new PrefixTree();
  });
  
  it("allow addition of words", function(){
    prefixTree.addWord("hello");
    prefixTree.addWord("hell");
    prefixTree.addWord("he");

    // console.log(prefixTree);
    
    expect(prefixTree.contains("he")).to.equal(true);
    expect(prefixTree.contains("hell")).to.equal(true);
    expect(prefixTree.contains("hello")).to.equal(true);
  });
  
  it("allow words with different prefixes", function(){
    prefixTree.addWord("hello");
    prefixTree.addWord("hell");
    prefixTree.addWord("he");
    
    prefixTree.addWord("me");
    prefixTree.addWord("mellon");
    
    expect(prefixTree.contains("he")).to.equal(true);
    expect(prefixTree.contains("hell")).to.equal(true);
    expect(prefixTree.contains("hello")).to.equal(true);
    expect(prefixTree.contains("me")).to.equal(true);
    expect(prefixTree.contains("mellon")).to.equal(true);
  });
  
  it("be able to tell if word exits in the prefix tree", function(){
    prefixTree.addWord("hello");
    prefixTree.addWord("hell");
    prefixTree.addWord("he");
    
    expect(prefixTree.contains("h")).to.equal(false);
    expect(prefixTree.contains("he")).to.equal(true);
    expect(prefixTree.contains("hel")).to.equal(false);
    expect(prefixTree.contains("hell")).to.equal(true);
    expect(prefixTree.contains("hello")).to.equal(true);
    expect(prefixTree.contains("me")).to.equal(false);
    expect(prefixTree.contains("")).to.equal(false);
    expect(prefixTree.contains("hella")).to.equal(false);
    expect(prefixTree.contains("hes")).to.equal(false);
  });
  
  it("be able to tell if prefix exits in the prefix tree (include words)", function(){
    var includeWords = true;
    
    prefixTree.addWord("hello");
    
    expect(prefixTree.isPrefix("", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("h", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("he", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("hel", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("hell", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("hello", includeWords)).to.equal(true);
  });
  
  it("be able to tell if prefix does not exits in the prefix tree (don't include words)", function(){
    var includeWords = false;
    
    prefixTree.addWord("hello");
    prefixTree.addWord("hellos");
    
    expect(prefixTree.isPrefix("", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("h", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("he", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("hel", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("hell", includeWords)).to.equal(true);
    expect(prefixTree.isPrefix("hello", includeWords)).to.equal(false);
  });
  
  it("import a library of scrabble words", function(){
    for (var i = 0; i < shortScrabbleLibrary.length; i++) {
      prefixTree.addWord(shortScrabbleLibrary[i]);
    }
    
    expect(prefixTree.contains("COFACTOR")).to.equal(true);
    expect(prefixTree.contains("cofactor")).to.equal(false);
  });
  
  it("be able to remove internal words from the prefix tree", function(){
    prefixTree.addWord("he");
    prefixTree.addWord("hell");
    prefixTree.addWord("hello");
    
    prefixTree.removeWord("hell");
    
    // console.log(prefixTree);
    
    expect(prefixTree.contains("hello")).to.equal(true);
    expect(prefixTree.contains("he")).to.equal(true);
    expect(prefixTree.contains("hell")).to.equal(false);
  });
  
  it("be able to remove terminal words from the prefix tree", function(){
    prefixTree.addWord("he");
    prefixTree.addWord("hell");
    prefixTree.addWord("hello");
    prefixTree.addWord("helps");
    prefixTree.addWord("helping");

    prefixTree.removeWord("helping");
    prefixTree.removeWord("helps");
    // console.log(prefixTree);
    
    expect(prefixTree.contains("helps")).to.equal(false);
    expect(prefixTree.contains("hello")).to.equal(true);
    expect(prefixTree.contains("hell")).to.equal(true);
    expect(prefixTree.contains("he")).to.equal(true);
    expect(prefixTree.contains("helping")).to.equal(false);

  });
  
  it("be able to remove terminal and internal words from the prefix tree", function(){
    prefixTree.addWord("he");
    prefixTree.addWord("hell");
    prefixTree.addWord("hello");
    prefixTree.addWord("helps");
    prefixTree.addWord("helping");;
    
    prefixTree.removeWord("helping");
    prefixTree.removeWord("he");
    prefixTree.removeWord("helps");
    
    // console.log(prefixTree);
    
    expect(prefixTree.contains("helps")).to.equal(false);
    expect(prefixTree.contains("hello")).to.equal(true);
    expect(prefixTree.contains("helping")).to.equal(false);
    expect(prefixTree.contains("he")).to.equal(false);
    expect(prefixTree.contains("hell")).to.equal(true);
  });
  
  it("adds and removes a single word", function(){
    prefixTree.addWord("h");

    prefixTree.removeWord("h");
    
    // console.log(prefixTree);
    
    expect(Object.keys(prefixTree._nodes).length === 0).to.equal(true);
  });
  
  it("adds and removes an entire library forwards", function(){
    for (var i = 0; i < shortScrabbleLibrary.length; i++) {
      prefixTree.addWord(shortScrabbleLibrary[i]);
    }
    
    for (var i = 0; i < shortScrabbleLibrary.length; i++) {
      prefixTree.removeWord(shortScrabbleLibrary[i]);
    }
    
    expect(Object.keys(prefixTree._nodes).length === 0).to.equal(true);
  });
  
  it("adds and removes an entire library backwards", function(){
    for (var i = 0; i < shortScrabbleLibrary.length; i++) {
      prefixTree.addWord(shortScrabbleLibrary[i]);
    }
    
    for (var i = shortScrabbleLibrary.length - 1; i >= 0; i--) {
      prefixTree.removeWord(shortScrabbleLibrary[i]);
    }
    
    expect(Object.keys(prefixTree._nodes).length === 0).to.equal(true);
  });
});