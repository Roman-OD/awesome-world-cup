import { Meteor } from 'meteor/meteor';
import { CronJob } from 'cron';
import { Games } from '/imports/api/games/games.js';
import { Matches} from '/imports/catalogs/catalogs.js';
import fetch from 'node-fetch';
// import moment from 'meteor/moment';

Meteor.startup(() => {
	if (Meteor.isServer) {

		// test mongo logic instead of fetching
		// let mongoMatchDays = Matches.find({}).fetch();
		// mongoMatchDays.forEach((mongoMatchDay) => {
		// 	mongoMatchDay.matches.forEach((mongoMatch) => {
		// 		console.log(mongoMatch.num);
		// 	});
		// });


		let seedScores = [50,125,150,175,200];
		let outcome;

		new CronJob('0 30 09 * * *', Meteor.bindEnvironment(() => {
			let now = new Date();
			let yesterday = new Date().setDate(now.getDate()-1);
			// fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json')
			// .then(res => res.json())
			// .then(body =>data = body)
			// .then(data => {
				// let matchDays = data.rounds;
				let matchDays = Matches.find({}).fetch();
				matchDays.forEach((matchDay) => {
					matchDay.matches.forEach((match) => {

						if(new Date(match.date).setHours(0,0,0,0) === new Date(yesterday).setHours(0,0,0,0)) {
							const { team1, team2, score1, score2 } = match;
							// console.log(match);
							let team1EventScore, team2EventScore;
							if (score1 < score2) {
			                	//team2 won the game
			                	team1EventScore = 1;
			                	team2EventScore = 5;
												outcome = "team2";
			                } else if (score1 === score2) {
			                	//draw
			                	team1EventScore = 3;
			                	team2EventScore = 3;
												outcome = "draw";
			                } else if (score1 > score2){
			                	//team1 won the game
			                	team1EventScore = 5;
			                	team2EventScore = 1;
												outcome = "team1";
			                }
			                if(team1EventScore){
				                Games.find({}).fetch().forEach((game) => {
							   				  game.players.forEach((player) => {
							   				  	console.log(player.name);
							   				  	console.log(`old player score: ${player.score}`);
							  					const seeds = [player.seed1, player.seed2, player.seed3, player.seed4];
							  					if(seeds[0]){
								  					seeds.forEach((seed) => {
								  					  if (seed.name === team1.name) {
								  					  	const score = ((seedScores[seed.seed] * team1EventScore) + (score1 * seedScores[0]));
								  					  	Games.update({ _id: game._id, 'players.name': player.name}, {$inc: { 'players.$.score': score } }, false, true);
								  					  }
								  					  if (seed.name === team2.name) {
								  					  	const score = ((seedScores[seed.seed] * team2EventScore) + (score2 * seedScores[0]));
								  					  	Games.update({ _id: game._id, 'players.name': player.name}, {$inc: { 'players.$.score': score } }, false, true);
								  					  }
								  					});
								  					console.log(`new player score pre-betting: ${player.score}`);
							  					}
													const bets = player.selectedBets;
													if(bets){
														if(bets.length > 0){
															bets.forEach((bet) => {
																if(bet.matchId === match.num){
																	if(bet[outcome].selected === true)
																		Games.update({ _id: game._id, 'players.name': player.name}, {$inc: { 'players.$.score': bet[outcome].potentialPayout } }, false, true);
																}
															});
															console.log(`new player score post-betting: ${player.score}`);
														}
													}
							   				  });
				                });
				            }
   						}
					});
				});
			// });
		}), null, true, 'Europe/London');
	}
});

/*******************************************************************************************
at end of match day:

	grab all teams that played and put them in an array of obejct:
ex.
	{
		team: "Nigeria",
		status: "draw"
	}

	check through player teams if someone has nigeria
	if so, check its seed position
		player score += seed position x event score


event scores:

lose = 1 points
draw = 3 points
win = 5 points




*******************************************************************************************/
