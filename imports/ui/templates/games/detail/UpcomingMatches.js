import './UpcomingMatches.html'

Template.UpcomingMatches.onCreated(function(){
    const matchList = [
        {homeTeam: 'Mexico', homeFlag: 'mx.png', awayTeam: 'Germany', awayFlag: 'de.png',
            stadium: 'Ekaterinburg Arena', date: 'Thursday 14 of June, 16:00', id: '123', stage: 'Group Stage - Matchday 1 of 3'},
        {homeTeam: 'Belgium', homeFlag: 'be.png', awayTeam: 'Spain', awayFlag: 'es.png',
            stadium: 'Luzhniki Stadium', date: 'Thursday 15 of June, 12:00', id: '456', stage: 'Group Stage - Matchday 1 of 3'}
    ]
    this.matches = new ReactiveVar(matchList)
})

Template.UpcomingMatches.helpers({
    getMatches: function () {
        return Template.instance().matches.get()
    }
})