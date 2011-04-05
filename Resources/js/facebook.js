Ti.include('application.js');
Ti.include('rest.js');

var FBHelper = {
		store_fbuid : function() {
			Ti.API.info("Associating the user_id with fbuid.....");
			var params = Array();
			params.user_id = Ti.App.Properties.getString("user_id");
			params.fb_uid = Ti.Facebook.uid;
			var rest_response_text = RESTHelper.fetch_data(fb_device_assoc,params);
			var rest_response = JSON.parse(rest_response_text);
			if(rest_response) {
				return true;
			}
		},

		fetch_friends : function() {
			Ti.API.info("Updating Friends.....");
			var query = "SELECT uid, name FROM user ";
			query +=  "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + Titanium.Facebook.uid + ")";
			query += " order by name asc";
			Titanium.Facebook.request('fql.query', {query: query},  function(r) {
				if(!r.success) {
					if(r.error){
					  alert(r.error);
					} else {
					  alert("call unsuccessful");
					}
					return;
				}
				
				var params = Array();
				params.friendsJSON = r.result;
				params.fb_uid = Ti.Facebook.uid;
				params.user_id = Ti.App.Properties.getString("user_id");
				var rest_response = RESTHelper.fetch_data(add_fb_friends,params);
				 
			});
		}
};

var win = Ti.UI.currentWindow;

Ti.Facebook.appid = "157162187678675";
Ti.Facebook.permissions = ['publish_stream','read_stream'];

function updateLoginStatus() {
	if(Titanium.Facebook.loggedIn) {
		if(FBHelper.store_fbuid()) {
		  //fetch friends and store in kc
			FBHelper.fetch_friends();
		}
	}
}

Ti.Facebook.addEventListener('login', updateLoginStatus);
Ti.Facebook.addEventListener('logout', updateLoginStatus);

var fbButton = Ti.Facebook.createLoginButton({
	bottom:30
}); 

win.add(fbButton);