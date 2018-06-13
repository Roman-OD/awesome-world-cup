import fetch from 'node-fetch';
import './UpcomingMatches.html'
import { Matches } from '/imports/catalogs/catalogs.js'

Template.UpcomingMatches.onCreated(function(){
    this.subscribe('matches.all')
})

Template.UpcomingMatches.helpers({
    getMatchDays: function() {
        let matchList = Matches.find({}).fetch()
        let legDateFilter = new Date()
        let matchMap = []
        legDateFilter.setDate(legDateFilter.getDate()+3)
        if(matchList) {
            matchMap = matchList.filter((leg) => {
                console.log(leg)
                for(match of leg.matches){
                    let matchDate = new Date(match.date)
                    if(matchDate > legDateFilter) {
                        return false
                    }
                    return true
                }
            })
        }
        return matchMap
    }
})