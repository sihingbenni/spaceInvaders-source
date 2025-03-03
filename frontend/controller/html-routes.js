// api routes for getting and posting game results
var express = require('express');

var htmlRouter = express.Router();

htmlRouter.get('/leaderboard', async function(request, response) {
	console.log('/leaderboard GET');

	const host = process.env.BACKEND_HOST;
	const port = process.env.BACKEND_PORT;
	const url = `http://${host}:${port}/api/leaderboard`;

	try {
		const fetchResponse = await fetch(url);
		if (!fetchResponse.ok) {
			throw new Error(`HTTP error! status: ${fetchResponse.status}`);
		}
		const data = await fetchResponse.json();
		let hbsObject = {
			Record: data,
			backendURL: process.env.BACKEND_URL
		};
		console.log(hbsObject);
		response.render("leaderboard", hbsObject);
	} catch (error) {
		console.error("Error fetching leaderboard data:", error);
		response.status(500).send("Error fetching leaderboard data");
	}
});

htmlRouter.get('/', function(request, response){
	console.log('/ GET');
	response.render("index", {
		backendURL: process.env.BACKEND_URL
	});
});

htmlRouter.get('/game', function(request, response){
	console.log(request.url, 'GET');
    response.render("game", {
		backendURL: process.env.BACKEND_URL
	});
});

htmlRouter.get('/gameOver/:score', function(request, response){
	console.log(request.url, 'GET');
	var gameScore = request.params.score
    response.render("gameOver", {
		gameScore: gameScore,
		backendURL: process.env.BACKEND_URL
	});
});


module.exports = htmlRouter;
