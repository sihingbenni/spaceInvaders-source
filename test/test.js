const axios = require('axios');
const cheerio = require('cheerio');
const expect = require('chai').expect;

describe("environements", () => {
  it("should have a GAME_URL environment variable", () => {
    expect(process.env.GAME_URL).to.not.equal(undefined);
  });
});

describe("spaceInvaders", function() {
  this.timeout(30000);

  it("should send user to the game page", async function() {
    const response = await axios.get(process.env.GAME_URL);
    const $ = cheerio.load(response.data);
    const gameLink = $("a[href='/game']");
    expect(gameLink).to.not.equal(undefined);
  });

  it("should send user to the leaderboard page", async function() {
    const response = await axios.get(process.env.GAME_URL);
    const $ = cheerio.load(response.data);
    const leaderboardLink = $("a[href='/leaderboard']");
    expect(leaderboardLink).to.not.equal(undefined);
  });
});
