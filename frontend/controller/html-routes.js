// api routes for getting and posting game results
var express = require('express');

var htmlRouter = express.Router();

htmlRouter.get('/leaderboard', function(request, response){
	console.log('/leaderboard GET');
	/*
	// execute sequelize method to find records, chain promise to store data as object
	db.Record.findAll({
		// sort array of records descending from highest score
		order: [['score', 'DESC'],]
	}).then(function(data){
		let hbsObject = { Record: data };
		console.log(hbsObject);
		// render leaderboard view and attach handlebarsObject
		response.render("leaderboard", hbsObject);
	});
	*/

	// call the backend api to get the leaderboard

	const host = process.env.BACKEND_HOST
	const port = process.env.BACKEND_PORT
	const url = `http://${host}:${port}/api/leaderboard`

	// [{"id":1,"user_name":"sihingbenni","score":200},{"id":2,"user_name":"sihingbenni","score":200},{"id":3,"user_name":"sihingbenni","score":200}]

	try {
		fetch(url).then(function(response){
			return response.json();
		}).then(function(data){
			let hbsObject = {
				Record: data,
				backendURL: process.env.BACKEND_URL
			};
			console.log(hbsObject);
			// render leaderboard view and attach handlebarsObject
			response.render("leaderboard", hbsObject);
		});
	} catch (error) {
		console.log(error);
		response.status(500).end();
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
