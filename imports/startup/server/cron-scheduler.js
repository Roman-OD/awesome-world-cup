import { Meteor } from 'meteor/meteor';
import { CronJob } from 'cron';
import { Games } from '/imports/api/games/games.js';
import fetch from 'node-fetch';
// import moment from 'meteor/moment';

Meteor.startup(() => {
	if (Meteor.isServer) {
		let seedScores = [50,125,150,175,200];
		new CronJob('0 30 23 * * *', Meteor.bindEnvironment(() => {
			fetch('https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json')
			.then(res => res.json())
			.then(body =>data = body)
			.then(data => {
				let matchDays = data.rounds;
				matchDays.forEach((matchDay) => {
					matchDay.matches.forEach((match) => {

						if(new Date(match.date).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)) {
							const { team1, team2, score1, score2 } = match;
							// console.log(match);
							let team1EventScore, team2EventScore;
							if (score1 < score2) {
			                	//team2 won the game
			                	team1EventScore = 1;
			                	team2EventScore = 5;
			                } else if (score1 === score2) {
			                	//draw
			                	team1EventScore = 3;
			                	team2EventScore = 3;
			                } else {
			                	//team1 won the game
			                	team1EventScore = 5;
			                	team2EventScore = 1;
			                }

			                Games.find({}).fetch().forEach((game) => {
			   				  game.players.forEach((player) => {
			  					const seeds = [player.seed1, player.seed2, player.seed3, player.seed4];
									console.log(player);
			  					if(seeds[0]){
										console.log(player);
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
			  					}
			   				  });
			                });
   						}
					});
				});
			});
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
