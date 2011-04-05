Ti.include('application.js');

var squadOptions = Titanium.UI.createTabbedBar({
    labels:['Transfer', 'Formation', 'Coach'],
    backgroundColor:innerMenuColor,
    top:innerMenuTopMargin,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:innerMenuHeight,
    width:innerMenuWidth
});

Ti.UI.currentWindow.setTitleControl(squadOptions);
