Ti.include('application.js');
Ti.include('rest.js');

var prevView, currView, nextView, friendView, leagueView = null;
var playOptions = null;

Ti.include('play_match.js');

var MatchHelper = {
	get_data : function()	{

		var params = Array();
		params.user_id = Ti.App.Properties.getString("user_id");
		var rest_response_text = RESTHelper.fetch_data(getRandonOpponents,params);
		var rest_response = JSON.parse(rest_response_text);
		MatchHelper.set_data(rest_response);
	},

  set_data : function(rest_response) {

  	var i = 0;
		var label, label2;
		var options = [];
		var data = [];
  	
  	if(rest_response != null) {
			
			var prev_opponent = null;
			if(rest_response.prev) {
				prev_opponent = rest_response.prev;
			}
			
			var current_opponent = null;
			if(rest_response.current) {
				current_opponent = rest_response.current;
			}
			
			var next_opponent = null;
			if(rest_response.next) {
				next_opponent = rest_response.next;
			}
			
			var friends_opponent = null;
			if(rest_response.friends) {
				friends_opponent = rest_response.friends;
			}
			
			var league_opponent = null;
			if(rest_response.clubs) {
				league_opponent = rest_response.clubs;
			}
			
			if(prev_opponent || current_opponent || next_opponent || friends_opponent || league_opponent) {

				if(prev_opponent) {
					
					data = [];
					options.push('<<<');
					for(i=0;i< prev_opponent.length; i++) {
						var prevTVRow = Ti.UI.createTableViewRow();
						
						prevTVRow.rightImage = '../assets/futbol.png';
						
						label = Ti.UI.createLabel({
							text:prev_opponent[i].team_name,
							color: '#fff',
							textAlign:'left',
							top:20,
							left:20,
							width:'auto',
							height:'auto',
							font:{fontWeight:'bold',fontSize:14}
						});
						prevTVRow.add(label);
						
						label2 = Ti.UI.createLabel({
							text: prev_opponent[i].formation +
										" GK(" + prev_opponent[i].gk + ")" +
										" DEF(" + prev_opponent[i].def + ")" +
										" POS(" + prev_opponent[i].pos +")" +
										" OFF(" + prev_opponent[i].off + ")",
							color: '#fff',
							textAlign:'left',
							font:{fontWeight:'bold',fontSize:10},
							height:'auto',
							top:40,
							left:20
						});
						
						prevTVRow.add(label2);
						data[i] = prevTVRow;
					}
					
					prevView = Titanium.UI.createTableView({
						data:data,
						style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
						backgroundColor:'transparent',
						top:55,
						maxRowHeight:70,
						minRowHeight:70,
						separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
					});
					
					prevView.addEventListener('click', function(e) {
						PlayMatchHelper.play_match(prev_opponent[e.index]);
					});

				} else {
					options.push('<<<');
					prevView = Ti.UI.createLabel({
						text:'No Fixures Available',
						color:'#fff',
						textAlign:'center',
						font:{fontWeight:'bold',fontSize:14},
						height:'auto',
						top:55
					});
				}
				Ti.UI.currentWindow.add(prevView);
				
				if(current_opponent) {
					data = [];
					options.push('---');
					for(i=0;i< current_opponent.length; i++) {
						var currTVRow = Ti.UI.createTableViewRow();
						
						currTVRow.rightImage = '../assets/futbol.png';
						
						label = Ti.UI.createLabel({
							text:current_opponent[i].team_name,
							color: '#fff',
							textAlign:'left',
							top:20,
							left:20,
							width:'auto',
							height:'auto',
							font:{fontWeight:'bold',fontSize:14}
						});
						currTVRow.add(label);
						
						label2 = Ti.UI.createLabel({
							text: current_opponent[i].formation +
										" GK(" + current_opponent[i].gk + ")" +
										" DEF(" + current_opponent[i].def + ")" +
										" POS(" + current_opponent[i].pos +")" +
										" OFF(" + current_opponent[i].off + ")",
							color: '#fff',
							textAlign:'left',
							font:{fontWeight:'bold',fontSize:10},
							height:'auto',
							top:40,
							left:20
						});
						
						currTVRow.add(label2);
						data[i] = currTVRow;
					}
					
					currView = Titanium.UI.createTableView({
						data:data,
						style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
						backgroundColor:'transparent',
						top:55,
						maxRowHeight:70,
						minRowHeight:70,
						separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
					});
					
					currView.addEventListener('click', function(e) {
						PlayMatchHelper.play_match(current_opponent[e.index]);
					});
					
				} else {
					options.push('---');
					currView = Ti.UI.createLabel({
						text:'No Fixtures Available',
						color:'#fff',
						textAlign:'center',
						font:{fontWeight:'bold',fontSize:14},
						height:'auto',
						top:55
					});
				}
				Ti.UI.currentWindow.add(currView);
				
				if(next_opponent) {
					data = [];
					options.push('>>>');
					for(i=0;i< next_opponent.length; i++) {
						var nextTVRow = Ti.UI.createTableViewRow();
						
						nextTVRow.rightImage = '../assets/futbol.png';
						
						label = Ti.UI.createLabel({
							text:next_opponent[i].team_name,
							color: '#fff',
							textAlign:'left',
							top:20,
							left:20,
							width:'auto',
							height:'auto',
							font:{fontWeight:'bold',fontSize:14}
						});
						nextTVRow.add(label);
						
						label2 = Ti.UI.createLabel({
							text: next_opponent[i].formation +
										" GK(" + next_opponent[i].gk + ")" +
										" DEF(" + next_opponent[i].def + ")" +
										" POS(" + next_opponent[i].pos +")" +
										" OFF(" + next_opponent[i].off + ")",
							color: '#fff',
							textAlign:'left',
							font:{fontWeight:'bold',fontSize:10},
							height:'auto',
							top:40,
							left:20
						});
						
						nextTVRow.add(label2);
						data[i] = nextTVRow;
					}
					
					nextView = Titanium.UI.createTableView({
						data:data,
						style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
						backgroundColor:'transparent',
						top:55,
						maxRowHeight:70,
						minRowHeight:70,
						separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
					});
					
					nextView.addEventListener('click', function(e) {
						PlayMatchHelper.play_match(next_opponent[e.index]);
					});
					
				} else {
					options.push('>>>');
					nextView = Ti.UI.createLabel({
						text:'No Fixures Available',
						color:'#fff',
						textAlign:'center',
						font:{fontWeight:'bold',fontSize:14},
						height:'auto',
						top:55
					});
				}
				Ti.UI.currentWindow.add(nextView);
				
				if(friends_opponent) {
					
					Ti.include('facebook.js');
					
					data = [];
					options.push('Frnds');
					for(i=0;i< friends_opponent.length; i++) {
						var friendsTVRow = Ti.UI.createTableViewRow();
						
						friendsTVRow.rightImage = '../assets/futbol.png';
						
						label = Ti.UI.createLabel({
							text:friends_opponent[i].team_name,
							color: '#fff',
							textAlign:'left',
							top:20,
							left:20,
							width:'auto',
							height:'auto',
							font:{fontWeight:'bold',fontSize:14}
						});
						friendsTVRow.add(label);
						
						label2 = Ti.UI.createLabel({
							text: friends_opponent[i].formation +
										" GK(" + friends_opponent[i].gk + ")" +
										" DEF(" + friends_opponent[i].def + ")" +
										" POS(" + friends_opponent[i].pos +")" +
										" OFF(" + friends_opponent[i].off + ")",
							color: '#fff',
							textAlign:'left',
							font:{fontWeight:'bold',fontSize:10},
							height:'auto',
							top:40,
							left:20
						});
						
						friendsTVRow.add(label2);
						data[i] = friendsTVRow;
					}
					
					friendView = Titanium.UI.createTableView({
						data:data,
						style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
						backgroundColor:'transparent',
						top:55,
						maxRowHeight:70,
						minRowHeight:70,
						separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
					});
					
					friendView.addEventListener('click', function(e) {
						PlayMatchHelper.play_match(friends_opponent[e.index]);
					});
					
				} else {
					Ti.include('facebook.js');
					options.push('Friends');
					friendView = Ti.UI.createLabel({
						text:'No Fixtures Available',
						color:'#fff',
						textAlign:'center',
						font:{fontWeight:'bold',fontSize:14},
						height:'auto',
						top:55
					});
				}
				Ti.UI.currentWindow.add(friendView);
				
				
				if(league_opponent) {
					data = [];
					var count = 0;
					options.push('Trop');
					for(var region in league_opponent) {
						data[count] = Ti.UI.createTableViewSection({headerTitle:region});
						for(i=0 ; i < league_opponent[region].length ; i++) {
							var leagueTVRow = Ti.UI.createTableViewRow({
								source_obj : league_opponent[region][i]
							});
							
							leagueTVRow.rightImage = '../assets/futbol.png';
							
							label = Ti.UI.createLabel({
								text:league_opponent[region][i].team_name,
								color: '#fff',
								textAlign:'left',
								top:20,
								left:20,
								width:'auto',
								height:'auto',
								font:{fontWeight:'bold',fontSize:14}
							});
							leagueTVRow.add(label);
							
							label2 = Ti.UI.createLabel({
								text: league_opponent[region][i].formation +
											" GK(" + league_opponent[region][i].gk + ")" +
											" DEF(" + league_opponent[region][i].def + ")" +
											" POS(" + league_opponent[region][i].pos +")" +
											" OFF(" + league_opponent[region][i].off + ")",
								color: '#fff',
								textAlign:'left',
								font:{fontWeight:'bold',fontSize:10},
								height:'auto',
								top:40,
								left:20
							});
							
							leagueTVRow.add(label2);
							data[count].add(leagueTVRow);
						}
						count++;
					}
					
					leagueView = Ti.UI.createTableView({
						data:data,
						style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
						backgroundColor:'#000',
						top:55,
						maxRowHeight:70,
						minRowHeight:70
					});
					
					leagueView.addEventListener('click', function(e) {
						PlayMatchHelper.play_match(e.row.source_obj);
					});
					
				} else {
					options.push('Trop');
					leagueView = Ti.UI.createLabel({
						text:'No Leagues Available',
						color:'#fff',
						textAlign:'center',
						font:{fontWeight:'bold',fontSize:14},
						height:'auto',
						top:55
					});
				}
				Ti.UI.currentWindow.add(leagueView);
				
				playOptions = Titanium.UI.createTabbedBar({
			    labels:options,
			    backgroundColor:innerMenuColor,
			    top:innerMenuTopMargin,
			    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
			    height:innerMenuHeight,
			    width:innerMenuWidth
				});
				
				//Create the listing for each tab if exist
				
				playOptions.index = 1;
				prevView.hide();
				currView.show();
				nextView.hide();
				friendView.hide();
				fbButton.hide();
				leagueView.hide();
				Ti.UI.currentWindow.add(playOptions);
				
				playOptions.addEventListener('click', function(e) {
					if(e.index == 0) {
						prevView.show();
						currView.hide();
						nextView.hide();
						friendView.hide();
						fbButton.hide();
						leagueView.hide();
					} else if(e.index == 1) {
						prevView.hide();
						currView.show();
						nextView.hide();
						friendView.hide();
						fbButton.hide();
						leagueView.hide();
					} else if(e.index == 2) {
						prevView.hide();
						currView.hide();
						nextView.show();
						friendView.hide();
						fbButton.hide();
						leagueView.hide();
					} else if(e.index == 3) {
						prevView.hide();
						currView.hide();
						nextView.hide();
						friendView.show();
						fbButton.show();
						leagueView.hide();
					} else if(e.index == 4) {
						prevView.hide();
						currView.hide();
						nextView.hide();
						friendView.hide();
						leagueView.show();
						fbButton.hide();
					}
				});
				
			} else {
				alert("No Matches Available");
			}
		}
  }
};

var refresh = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});

refresh.addEventListener('click', function(e){
	Ti.UI.currentWindow.remove(prevView);
	Ti.UI.currentWindow.remove(currView);
	Ti.UI.currentWindow.remove(nextView);
	Ti.UI.currentWindow.remove(friendView);
	Ti.UI.currentWindow.remove(fbButton);
	Ti.UI.currentWindow.remove(leagueView);
	Ti.UI.currentWindow.remove(playOptions);
	MatchHelper.get_data();
	if(Titanium.Facebook.loggedIn) {
		FBHelper.fetch_friends();
	}
});
Ti.UI.currentWindow.rightNavButton = refresh;
Ti.UI.currentWindow.title = 'PLAY MATCHES';

MatchHelper.get_data();