var appBackgroundColor = '#000';
var innerMenuTopMargin = 10;
var innerMenuWidth = 300;
var innerMenuHeight = 30;
var innerMenuColor = '#336699';
var innerMenuFontColor = '';
var userColor = '#00f';
var oppColor = '#f00';

var thisDeviceID = Titanium.Platform.id;

var BASE_API_URL = 'http://10.201.216.11:8401/';

//Rest END Points
var createUser 					= BASE_API_URL + 'futbol/create_user';
var getSquad 						= BASE_API_URL + 'futbol/get_squad';
var getLeaderBoard 			= BASE_API_URL + 'futbol/get_leader_board';
var getAchievements 		= BASE_API_URL + 'futbol/get_achievements';
var getRandonOpponents 	= BASE_API_URL + 'futbol/match_listing';
var playMatch						= BASE_API_URL + 'futbol/play_match';
var fb_device_assoc     = BASE_API_URL + 'futbol/fb_device_assoc';
var add_fb_friends      = BASE_API_URL + 'futbol/add_fb_friends';