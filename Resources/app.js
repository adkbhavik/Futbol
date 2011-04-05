Ti.include('js/application.js');

Ti.UI.setBackgroundColor(appBackgroundColor);

// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'mainTG'});


// Home Tab
var homeWindow = Titanium.UI.createWindow({
    url:'js/home.js',
    titleid:'home_win_title'
});

var homeTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Home',
    window:homeWindow
});


//Match Tab
var matchWindow = Titanium.UI.createWindow({  
    url:'js/match.js',
    titleid:'match_win_title'
});
var matchTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Match',
    window:matchWindow
});


// Squad Tab
var squadWindow = Titanium.UI.createWindow({
    url:'js/squad.js',
    titleid:'squad_win_title'
});
var squadTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Squad',
    window:squadWindow
});


// Presidents Tab
var presidentWindow = Titanium.UI.createWindow({
    url:'js/president.js',
    titleid:'president_win_title'
});
var presidentTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'President',
    window:presidentWindow
});


tabGroup.addTab(homeTab);
tabGroup.addTab(matchTab);
tabGroup.addTab(squadTab);
tabGroup.addTab(presidentTab);

tabGroup.setActiveTab(0);
// open tab group

tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,
	fullscreen:true	
});


Ti.include('js/rest.js');
Ti.include('js/boot.js');

//Check if the user has opened the app first time, if yes, ask to choose team and team name
if(new_user == "1") {
		//Create a popup widow
		var initWindow = Titanium.UI.createWindow({
			height:0,
			backgroundColor:appBackgroundColor,
			bottom:0
		});
		
		// create a button to close window
		var submitButton = Titanium.UI.createButton({
			title:'Start Playing',
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		initWindow.setRightNavButton(submitButton);
		submitButton.addEventListener('click', function()
		{
			initWindow.close();
			tabGroup.open({
				transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		});
		
		initWindow.open({modal:true});
}