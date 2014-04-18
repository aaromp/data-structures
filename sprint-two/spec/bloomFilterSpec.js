var expect = chai.expect;

describe("bloomFilter", function() {
  var bloomFilter;
  var m = 18;
  var k = 3;
  var people = [["Steven", "Tyler"], ["George", "Harrison"], ["Mr.", "Doob"], ["Dr.", "Sunshine"], ["John", "Resig"], ["Brendan", "Eich"], ["Alan", "Turing"]];


  beforeEach(function() {
    bloomFilter = new BloomFilter(m, k);
  });

  it("should have methods named 'add', and 'query", function() {
    expect(bloomFilter.add).to.be.a('function');
    expect(bloomFilter.query).to.be.a('function');
  });

  it("should store values that were inserted", function() {
    bloomFilter.add(people[0]);
    expect(bloomFilter.query(people[0])).to.equal(true);
  });

  it("should not contain values that were not inserted", function() {
    bloomFilter.add(people[0]);
    expect(bloomFilter.query(people[1])).to.equal(false);
  });

  it("should handle hash function collisions", function(){
    bloomFilter.add(people[0]);
    bloomFilter.add(people[1]);
    bloomFilter.add(people[2]);
    bloomFilter.add(people[3]);
    expect(bloomFilter.query(people[4])).to.equal(false);
    expect(bloomFilter.query(people[5])).to.equal(false);
    expect(bloomFilter.query(people[6])).to.equal(false);
  });
  
  it("should handle hash function collisions", function(){
    bloomFilter.add(people[0]);
    bloomFilter.add(people[1]);
    bloomFilter.add(people[2]);
    bloomFilter.add(people[3]);
    expect(bloomFilter.query(people[0])).to.equal(true);
    expect(bloomFilter.query(people[1])).to.equal(true);
    expect(bloomFilter.query(people[2])).to.equal(true);
    expect(bloomFilter.query(people[3])).to.equal(true);
  });
  
  it("should handle hash function collisions", function(){
    
    // put n/2 objects in the bloom filter, check n.
    var n = 1000;
    var numFound = 0;
    for (var i = 0; i < n; i ++) {
      var obj = [i];
      if ( i % 2 === 0) {
        bloomFilter.add(obj);
      }
      if (bloomFilter.query(obj)) {
       numFound++; 
      }
    }
    
    var falsePositives = numFound - n/2;
    
    console.log(falsePositives);
    console.log((1 - (Math.E^((-(k*n)/m))^k)));
    //expect(numFound).to.equal(true);
  });
});
