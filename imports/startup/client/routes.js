import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Accounts } from 'meteor/accounts-base';

import '/imports/ui/layouts/MainLayout.js'
import '/imports/ui/layouts/LoginLayout.js';

import '/imports/ui/templates/login/Login.js';
import '/imports/ui/templates/home/Home.js';
import '/imports/ui/templates/games/Games.js';
import '/imports/ui/templates/games/NewGame.js';
import '/imports/ui/templates/games/MyGames.js';
import '/imports/ui/templates/games/GameDetail.js';
import '/imports/ui/templates/matches/MatchDetail.js';
import '/imports/ui/templates/fixtures/Fixtures.js';
import '/imports/ui/templates/scoreboard/Scoreboard.js';
import '/imports/ui/templates/404/NotFound.js';

if(Meteor.isClient){
  Accounts.onLogout(function(){
    Meteor.logout();
    FlowRouter.go('login');
  });
}

FlowRouter.notFound = {
  action: function(){
    FlowRouter.go('not-found');
  }
};

FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()){
    FlowRouter.go('login');
  }
}]);

FlowRouter.route('/login', {
  name: 'login',
  triggersEnter: [function(context, redirect){
    if(Meteor.userId()){
      redirect('/');
    }
  }],
  action() {
    BlazeLayout.render('LoginLayout', { main: 'Login'});
  }
});

/**
 * Loads the home page
 */
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Home'});
  }
})

/**
 * Deprecated: consider removing
 */
FlowRouter.route('/games', {
  name: 'games',
  action(){
    BlazeLayout.render('MainLayout', {main: 'Games'});
  }
});

/**
 * Returns the creation form for players to create new games
 */
FlowRouter.route('/new-game', {
    name: 'new-game',
    action() {
        BlazeLayout.render('MainLayout', {main: 'NewGame'});
    }
});

/**
 * Returns the list of games a user is a part of (master and player)
 */
FlowRouter.route('/games/:userId', {
    name: 'myGames',
    action(){
        BlazeLayout.render('MainLayout', {main: 'MyGames'});
    }
});

/**
 * Returns detailed information for a particular game
 */
FlowRouter.route('/games/detail/:gameId', {
    name: 'game-detail',
    action(){
        BlazeLayout.render('MainLayout', {main: 'GameDetail'});
    }
})

/**
 * Returns detailed information for a particular match
 */
FlowRouter.route('/match/detail/:matchId', {
    name: 'match-detail',
    action(){
        BlazeLayout.render('MainLayout', {main: 'MatchDetail'});
    }
})

FlowRouter.route('/fixtures', {
  name: 'fixtures',
  action(){
    BlazeLayout.render('MainLayout', {main: 'Fixtures'});
  }
});

FlowRouter.route('/scoreboard', {
  name: 'scoreboard',
  action(){
    BlazeLayout.render('MainLayout', {main: 'Scoreboard'});
  }
});
