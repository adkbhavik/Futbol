var user_id, games, max_games, friendlies, max_friendlies, funds, rpt_points, trophies, level, wdl, new_user ;

var params = Array();
params.device_id = thisDeviceID;
var rest_response_text = RESTHelper.fetch_data(createUser,params);

rest_response = JSON.parse(rest_response_text);

if(rest_response != null && rest_response.user_id != 'undefined' && rest_response.games != 'undefined' &&
		rest_response.max_games != 'undefined' && rest_response.max_friendlies != 'undefined' &&
		rest_response.friendlies != 'undefined' && rest_response.funds != 'undefined' &&
		rest_response.rpt_points != 'undefined' && rest_response.trophies != 'undefined' &&
		rest_response.level != 'undefined' && rest_response.wld != 'undefined' &&
		rest_response.new_user != 'undefined') {
  
  user_id = rest_response.user.user_id.toString();
  games = rest_response.user.games.toString();
  max_games = rest_response.user.max_games.toString();
  friendlies = rest_response.user.friendlies.toString();
  max_friendlies = rest_response.user.max_friendlies.toString();
  funds = rest_response.user.funds.toString();
  rpt_points = rest_response.user.rpt_points.toString();
  trophies = rest_response.user.trophies.toString();
  level = rest_response.user.level.toString();
  wdl = rest_response.user.wdl.toString();
  new_user = rest_response.new_user.toString();
  team_name = rest_response.user.team_name.toString();
  
  Ti.App.Properties.setString("user_id", rest_response.user.user_id.toString());
  Ti.App.Properties.setString("games", rest_response.user.games.toString());
  Ti.App.Properties.setString("max_games", rest_response.user.max_games.toString());
	Ti.App.Properties.setString("friendlies", rest_response.user.friendlies.toString());
	Ti.App.Properties.setString("max_friendlies", rest_response.user.max_friendlies.toString());
	Ti.App.Properties.setString("funds", rest_response.user.funds.toString());
	Ti.App.Properties.setString("rpt_points", rest_response.user.rpt_points.toString());
	Ti.App.Properties.setString("trophies", rest_response.user.trophies.toString());
	Ti.App.Properties.setString("level", rest_response.user.level.toString());
	Ti.App.Properties.setString("wdl", rest_response.user.wdl.toString());
	Ti.App.Properties.setString("new_user", rest_response.new_user.toString());
	Ti.App.Properties.setString("team_name", rest_response.user.team_name.toString());
}