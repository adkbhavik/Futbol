var RESTHelper = {
  
  fetch_data : function(endpoint, params) {
    var temp = Array();
    var param_string = '';
    for(var key in params) {
      if(key && params[key]) {
        temp.push(key + "=" + params[key]);
      }
    }
    
    if(temp.length > 0) {
      endpoint = endpoint + '?' + temp.join('&');
    }
    
    //Create HTTPClient
    var request = Titanium.Network.createHTTPClient();
    
    Ti.API.info('REST CALL ' + endpoint);
    request.open("GET",endpoint, false);
    request.send();
		var rest_response_text = request.responseText;
		if(rest_response_text) {
			return rest_response_text;
		} else {
			return false;
		}
  }
};