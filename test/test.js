const http = require('http');
const cheerio = require('cheerio');
const expect = require('chai').expect;

process.env.FRONTEND_URL = 'http://localhost:3000/';
process.env.BACKEND_URL = 'http://localhost:8080/';

describe("environements", () => {
  it("should have a FRONTEND_URL environment variable", () => {
    expect(process.env.FRONTEND_URL).to.not.equal(undefined);
  });
});

describe("spaceInvaders", function() {
  this.timeout(30000);

  it("should send user to the game page", function(done) {
    http.get(process.env.FRONTEND_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const $ = cheerio.load(data);
        const gameLink = $("a[href='/game']");
        expect(gameLink).to.not.equal(undefined);
        done();
      });
    }).on('error', (err) => {
      done(err);
    });
  });

  it("should send user to the leaderboard page", function(done) {
    http.get(process.env.FRONTEND_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const $ = cheerio.load(data);
        const leaderboardLink = $("a[href='/leaderboard']");
        expect(leaderboardLink).to.not.equal(undefined);
        done();
      });
    }).on('error', (err) => {
      done(err);
    });
  });

  it("should create a new record", function(done) {
    const postData = JSON.stringify({
      user_name: 'test',
      score: -100
    });

    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/api/score',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });

    req.on('error', (err) => {
      done(err);
    });

    req.write(postData);
    req.end();
  });

  it("should show the record on the leaderboard", function(done) {
    http.get(process.env.FRONTEND_URL + 'leaderboard', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const $ = cheerio.load(data);
        const record = $("tr").last().children();
        console.log($('tr').last().html());
        expect(record.eq(0).text()).to.equal('test');
        expect(record.eq(1).text()).to.equal('-100');
        done();
      });
    }).on('error', (err) => {
      done(err);
    });
  });

});