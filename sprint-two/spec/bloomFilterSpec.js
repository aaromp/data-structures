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
  
  it("should return positive for added values", function(){
    bloomFilter.add(people[0]);
    bloomFilter.add(people[1]);
    bloomFilter.add(people[2]);
    bloomFilter.add(people[3]);
    expect(bloomFilter.query(people[0])).to.equal(true);
    expect(bloomFilter.query(people[1])).to.equal(true);
    expect(bloomFilter.query(people[2])).to.equal(true);
    expect(bloomFilter.query(people[3])).to.equal(true);
  });
  
  it("should have an acceptable number of false positives", function(){
    
    // put n/2 objects in the bloom filter, check n.
    var n = 10000;
    var numFound = 0;
    for (var i = 0; i < n; i ++) {
      bloomFilter = new BloomFilter(m, k);
      bloomFilter.add(people[1]);
      bloomFilter.add(people[2]);
      bloomFilter.add(people[3]);
      if (bloomFilter.query(people[4])) numFound++;
      if (bloomFilter.query(people[5])) numFound++;
      if (bloomFilter.query(people[6])) numFound++;
    }
    
    var falsePositives = numFound - 3; // expect three positives
    var expected = (1 - (Math.E^((-(k*n)/m))^k));
    var upperBoundary = expected + (expected * .25);
    
    expect(falsePositives).to.be.below(upperBoundary);
  });
});
