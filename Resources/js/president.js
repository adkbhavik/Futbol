Ti.include('application.js');

var presidentOptions = Titanium.UI.createTabbedBar({
    labels:['Buy', 'Spend'],
    backgroundColor:innerMenuColor,
    top:innerMenuTopMargin,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:innerMenuHeight,
    width:innerMenuWidth
});

Ti.UI.currentWindow.setTitleControl(presidentOptions);