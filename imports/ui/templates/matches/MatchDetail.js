import './MatchDetail.html'

Template.MatchDetail.helpers({
    matchId: () => {
        return FlowRouter.getParam("matchId")
    }
})