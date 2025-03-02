const axios = require('axios');
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

  it("should send user to the game page", async function() {
    const response = await axios.get(process.env.FRONTEND_URL);
    const $ = cheerio.load(response.data);
    const gameLink = $("a[href='/game']");
    expect(gameLink).to.not.equal(undefined);
  });

  it("should send user to the leaderboard page", async function() {
    const response = await axios.get(process.env.FRONTEND_URL);
    const $ = cheerio.load(response.data);
    const leaderboardLink = $("a[href='/leaderboard']");
    expect(leaderboardLink).to.not.equal(undefined);
  });

  it("should create a new record", async function() {
    const response = await axios.post(process.env.BACKEND_URL + 'api/score', {
      user_name: 'test',
      score: -100
    });
    expect(response.status).to.equal(200);
  });

  it("should show the record on the leaderboard", async function() {
    const response = await axios.get(process.env.FRONTEND_URL + 'leaderboard');
    const $ = cheerio.load(response.data);
    const record = $("tr").last().children();
    console.log($('tr').last().html());
    expect(record.eq(0).text()).to.equal('test');
    expect(record.eq(1).text()).to.equal('-100');
  });

});
