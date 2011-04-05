Ti.include('application.js');

var homeOptions = Titanium.UI.createTabbedBar({
    labels:['Overview', 'Leader Board', 'Achievements'],
    backgroundColor:innerMenuColor,
    top:innerMenuTopMargin,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:innerMenuHeight,
    width:innerMenuWidth
});

homeOptions.index = 0;
Ti.UI.currentWindow.setTitleControl(homeOptions);


/* Add the User Current Data
 * - games left to play
 * - friendlies left to play
 * - funds available
 * - reputation points
 * - tropies earned
 * - user level
 * - wins / losses / draws
 */

//Overview 
var overviewLabel = Ti.UI.createLabel({
    id:'overview_label',
    text:'Overview',
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:10
});
 
//Games
var gameLabel = Ti.UI.createLabel({
    id:'game_label',
    text:'Games: ' + Ti.App.Properties.getString("games") + '/' + Ti.App.Properties.getString("max_games"),
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:30
});

//Friendlies
var friendliesLabel = Ti.UI.createLabel({
    id:'friendlies_label',
    text:'Friendlies: ' + Ti.App.Properties.getString("friendlies") + '/' + Ti.App.Properties.getString("max_friendlies"),
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:50
});

//Funds
var fundsLabel = Ti.UI.createLabel({
    id:'funds_label',
    text:'Funds: $' + Ti.App.Properties.getString("funds"),
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:70
});

//Reputation Points
var reputationLabel = Ti.UI.createLabel({
    id:'reputation_label',
    text:'Reputation Points: ' + Ti.App.Properties.getString("rpt_points"),
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:90
});

//Trophies
var trophiesLabel = Ti.UI.createLabel({
    id:'trophies_label',
    text:'Trophies: ' + Ti.App.Properties.getString("trophies"),
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:110
});

//Level
var levelLabel = Ti.UI.createLabel({
    id:'level_label',
    text:'Level: ' + Ti.App.Properties.getString("level"),
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:130
});

Ti.UI.currentWindow.add(overviewLabel);
Ti.UI.currentWindow.add(gameLabel);
Ti.UI.currentWindow.add(friendliesLabel);
Ti.UI.currentWindow.add(fundsLabel);
Ti.UI.currentWindow.add(reputationLabel);
Ti.UI.currentWindow.add(trophiesLabel);
Ti.UI.currentWindow.add(levelLabel);


/* Leaderboard Tab
 * - Display the leaderboard
 */

//Overview 
var leaderboardLabel = Ti.UI.createLabel({
    id:'overview_label',
    text:'Leaderboard',
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:10
});

Ti.UI.currentWindow.add(leaderboardLabel);
leaderboardLabel.hide();


/* Achievements Tab
 * - Display the user achievements
 */

//Achievements 
var achievementsLabel = Ti.UI.createLabel({
    id:'achievements_label',
    text:'Achievements',
    color:'#336699',
    textAlign:'center',
    width:'auto',
    height:'auto',
    top:10
});

Ti.UI.currentWindow.add(achievementsLabel);
achievementsLabel.hide();


homeOptions.addEventListener('click',function(e) {

    if(e.index == 0) {
        //Overview
        overviewLabel.show();
        gameLabel.show();
        friendliesLabel.show();
        fundsLabel.show();
        reputationLabel.show();
        trophiesLabel.show();
        levelLabel.show();
        achievementsLabel.hide();
        leaderboardLabel.hide();
    }
    else if(e.index == 1) {
        //Leader Board
        overviewLabel.hide();
        gameLabel.hide();
        friendliesLabel.hide();
        fundsLabel.hide();
        reputationLabel.hide();
        trophiesLabel.hide();
        levelLabel.hide();
        achievementsLabel.hide();
        leaderboardLabel.show();
    }
    else if(e.index == 2) {
        //Achievements
        overviewLabel.hide();
        gameLabel.hide();
        friendliesLabel.hide();
        fundsLabel.hide();
        reputationLabel.hide();
        trophiesLabel.hide();
        levelLabel.hide();
        achievementsLabel.show();
        leaderboardLabel.hide();
    }
});
