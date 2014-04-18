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
  
  xit("allow addition of words", function(){
    prefixTree.add("hello");
    prefixTree.add("hell");
    prefixTree.add("he");
    
    
    console.log(prefixTree);
  });
  
  xit("allow words with different prefixes", function(){
    prefixTree.add("hello");
    prefixTree.add("hell");
    prefixTree.add("he");
    
    prefixTree.add("me");
    prefixTree.add("mello");
    
    
    console.log(prefixTree);
  });
  
  xit("be able to tell if word exits in the prefix tree", function(){
    prefixTree.add("hello");
    prefixTree.add("hell");
    prefixTree.add("he");
    
    console.log(prefixTree.contains("h"));
    console.log(prefixTree.contains("he"));
    console.log(prefixTree.contains("hel"));
    console.log(prefixTree.contains("hell"));
    console.log(prefixTree.contains("hello"));
    console.log(prefixTree.contains("me"));
    console.log(prefixTree.contains(""));
    console.log(prefixTree.contains("hella"));
    console.log(prefixTree.contains("hes"));
  });
  
  xit("be able to tell if prefix exits in the prefix tree", function(){
    prefixTree.add("hello");
    
    console.log(prefixTree.isPrefix(""));
    console.log(prefixTree.isPrefix("h"));
    console.log(prefixTree.isPrefix("he"));
    console.log(prefixTree.isPrefix("hel"));
    console.log(prefixTree.isPrefix("hell"));
    console.log(prefixTree.isPrefix("hello"));
  });
  
  xit("be able to tell if prefix does not exits in the prefix tree", function(){
    prefixTree.add("hello");
    prefixTree.add("hell");
    prefixTree.add("he");
    
    console.log(prefixTree.isPrefix("hellos"));
    console.log(prefixTree.isPrefix("her"));
    console.log(prefixTree.isPrefix("me"));
  });
  
  xit("import a library of scrabble words", function(){
    for (var i = 0; i < shortScrabbleLibrary.length; i++) {
      prefixTree.add(shortScrabbleLibrary[i]);
    }
    console.log(prefixTree.contains("COFACTOR"));
    console.log(prefixTree.contains("AARON"));
    console.log(prefixTree);
  });
});
