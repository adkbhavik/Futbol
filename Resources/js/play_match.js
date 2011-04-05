var PlayMatchHelper = {
	play_match : function (opponent) {
		var isClub = false;
		if(opponent.club_id) {
			isClub = true;
		}
		var params = Array();
		params.user_id 			= Ti.App.Properties.getString("user_id");
		if(isClub) {
			params.club_id 	= opponent.club_id;
		} else {
			params.opponent_id 	= opponent.user_id;
		}
		
		var rest_response_text = RESTHelper.fetch_data(playMatch,params);
		var rest_response = JSON.parse(rest_response_text);
		
		if(!rest_response.response) {
			alert(rest_response.message);
			return true;
		}
		
		if(rest_response) {
			var user_squad    = rest_response.match_summary.user_squad;
			var opp_squad     = rest_response.match_summary.opp_squad;
			var match_details = rest_response.match_summary.match_details;
			var player_names  = rest_response.match_summary.player_names;
			var playMatchWindow = Ti.UI.createWindow({
				background:'#fff',
				title:'GAME PLAY'
			});
			
			var scrollView = Ti.UI.createScrollView({
				contentWidth:'auto',
				contentHeight:'auto',
				top:0,
				showVerticalScrollIndicator:true,
				showHorizontalScrollIndicator:false
			});
			
			var closeButton = Ti.UI.createButton({
				title:'Close',
				style:Ti.UI.iPhone.SystemButtonStyle.PLAIN
			});
			
			playMatchWindow.setLeftNavButton(closeButton);
			closeButton.addEventListener('click',function(){
				playMatchWindow.close();
			});
			
			//Create top bar for team name
			var homeTeamLabel = Titanium.UI.createLabel({
				text:Ti.App.Properties.getString("team_name"),
				height:20,
				width:'auto',
				color:'#fff',
				font:{fontSize:15},
				top:0,
				left:5
			});
			var vsLabel = Titanium.UI.createLabel({
				text:" Vs ",
				height:20,
				width:'auto',
				color:'#fff',
				font:{fontSize:15},
				top:0
			});
			var oppTeamLabel = Titanium.UI.createLabel({
				text:opponent.team_name,
				height:20,
				width:'auto',
				color:'#fff',
				font:{fontSize:15},
				top:0,
				right:5
			});
			
			//Create formation label for each team
			var homeTeamFormationLabel = Titanium.UI.createLabel({
				text:rest_response.match_summary.user_squad.formation,
				height:20,
				width:'auto',
				color:'#fff',
				font:{fontSize:15},
				top:20,
				left:5
			});
			var oppTeamFormationLabel = Titanium.UI.createLabel({
				text:rest_response.match_summary.opp_squad.formation,
				height:20,
				width:'auto',
				color:'#fff',
				font:{fontSize:15},
				top:20,
				right:5
			});
			
			var opponentTeamFormationLabel = Titanium.UI.createLabel({
				text:rest_response.match_summary.opp_squad.formation,
				width:'auto',
				height:20,
				color:oppColor,
				font:{fontSize:15},
				top:40,
				right:5
			});
			
			//Add team rating for each position for each team
			var homeTeamRatingLabel = Titanium.UI.createLabel({
				text:
				" G(" + user_squad.total_rating.gk + ")" +
				" D(" + user_squad.total_rating.def + ")" +
				" P(" + user_squad.total_rating.pos +")" +
				" O(" + user_squad.total_rating.off + ")",
				width:'auto',
				height:10,
				color:'#fff',
				font:{fontSize:12},
				top:50,
				left:5
			});
			
			var opponentTeamRatingLabel = Titanium.UI.createLabel({
				text:
						" G(" + opp_squad.total_rating.gk + ")" +
						" D(" + opp_squad.total_rating.def + ")" +
						" P(" + opp_squad.total_rating.pos +")" +
						" O(" + opp_squad.total_rating.off + ")",
				width:'auto',
				height:10,
				color:'#fff',
				font:{fontSize:12},
				top:50,
				right:5
			});
			
			var summaryHeadLabel = Ti.UI.createLabel({
				text:"SCORE SUMMARY",
				color:'#fff',
				font:{fontSize:15},
				height:'auto',
				width:'auto',
				top:90
			});
			
			var summaryScrollView = Ti.UI.createScrollView({
				height:150,
				top:(summaryHeadLabel.height+summaryHeadLabel.top+10),
				left:5,
				right:5,
				borderRadius:5,
				backgroundColor:'#222222',
				showVerticalScrollIndicator:true,
				showHorizontalScrollIndicator:false
			});
			
			//Display the squad of each team
			var squadHeadLabel = Ti.UI.createLabel({
				text:"SQUAD",
				color:'#fff',
				font:{fontSize:15},
				height:'auto',
				width:'auto',
				top:(summaryScrollView.top+summaryScrollView.height+10)
			});
			
			//View for user squad
			var userSquadScrollView = Ti.UI.createView({
				height:400,
				width:150,
				top:(squadHeadLabel.top+squadHeadLabel.height+10),
				left:5,
				borderRadius:5,
				backgroundColor:'#111111',
				showVerticalScrollIndicator:false,
				showHorizontalScrollIndicator:false
			});
			
			var userSquadData = [];
			var userTableView = Titanium.UI.createTableView({
				data:userSquadData,
				top:5,
				backgroundColor:'#111111',
				separatorColor:'#000',
				scrollable:true,
				touchEnabled:true,
				rowHeight:20
			});
			var userSquadRow = Ti.UI.createTableViewRow();
			var headings;
			headings = Ti.UI.createLabel({
				text:"FORWARDS",
				backgroundColor:'#111111',
				color:'#fff',
				font:{fontSize:14},
				height:'auto',
				width:'auto',
				left:5
			});
			userSquadRow.add(headings);
			userTableView.appendRow(userSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			
			//Insert the forwards players
			for(var t = 0 ; t<user_squad.off.length ; t++) {
				userSquadRow = Ti.UI.createTableViewRow();
				var pl = player_names[user_squad.off[t]];
				var playerList = Ti.UI.createLabel({
					text:(t == user_squad.off.length-1 ? "(S) " : "") + pl.first_name + " " + pl.last_name + "   " + pl.rating,
					color:'#fff',
					font:{fontSize:12},
					height:'auto',
					width:'auto',
					right:5
				});
				userSquadRow.add(playerList);
				userTableView.appendRow(userSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			}
			
			userSquadRow = Ti.UI.createTableViewRow();
			headings = Ti.UI.createLabel({
				text:"MIDFIELDERS",
				backgroundColor:'#111111',
				color:'#fff',
				font:{fontSize:14},
				height:'auto',
				width:'auto',
				left:5
			});
			userSquadRow.add(headings);
			userTableView.appendRow(userSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});

			//Insert the forwards players
			for(t = 0 ; t<user_squad.mid.length ; t++) {
				userSquadRow = Ti.UI.createTableViewRow();
				pl = player_names[user_squad.mid[t]];
				playerList = Ti.UI.createLabel({
					text:(t == user_squad.mid.length-1 ? "(S) " : "") + pl.first_name + " " + pl.last_name + "   " + pl.rating,
					color:'#fff',
					font:{fontSize:12},
					height:'auto',
					width:'auto',
					right:5
				});
				userSquadRow.add(playerList);
				userTableView.appendRow(userSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			}
			
			userSquadRow = Ti.UI.createTableViewRow();
			headings = Ti.UI.createLabel({
				text:"MIDFIELDERS",
				backgroundColor:'#111111',
				color:'#fff',
				font:{fontSize:14},
				height:'auto',
				width:'auto',
				left:5
			});
			userSquadRow.add(headings);
			userTableView.appendRow(userSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});

			//Insert the defenders players
			for(t = 0 ; t<user_squad.def.length ; t++) {
				userSquadRow = Ti.UI.createTableViewRow();
				pl = player_names[user_squad.def[t]];
				playerList = Ti.UI.createLabel({
					text:(t == user_squad.def.length-1 ? "(S) " : "") + pl.first_name + " " + pl.last_name + "   " + pl.rating,
					color:'#fff',
					font:{fontSize:12},
					height:'auto',
					width:'auto',
					right:5
				});
				userSquadRow.add(playerList);
				userTableView.appendRow(userSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			}
			
			userSquadRow = Ti.UI.createTableViewRow();
			headings = Ti.UI.createLabel({
				text:"GOALKEEPERS",
				backgroundColor:'#111111',
				color:'#fff',
				font:{fontSize:14},
				height:'auto',
				width:'auto',
				left:5
			});
			userSquadRow.add(headings);
			userTableView.appendRow(userSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});

			//Insert the defenders players
			for(t = 0 ; t<user_squad.gk.length ; t++) {
				userSquadRow = Ti.UI.createTableViewRow();
				pl = player_names[user_squad.gk[t]];
				playerList = Ti.UI.createLabel({
					text:(t == user_squad.gk.length-1 ? "(S) " : "") + pl.first_name + " " + pl.last_name + "   " + pl.rating,
					color:'#fff',
					font:{fontSize:12},
					height:'auto',
					width:'auto',
					right:5
				});
				userSquadRow.add(playerList);
				userTableView.appendRow(userSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			}
			
			userSquadScrollView.add(userTableView);
			
			
			//View for opp squad
			var oppSquadScrollView = Ti.UI.createView({
				height:400,
				width:150,
				top:(squadHeadLabel.top+squadHeadLabel.height+10),
				right:5,
				borderRadius:5,
				backgroundColor:'#111111',
				showVerticalScrollIndicator:false,
				showHorizontalScrollIndicator:false
			});
			
			var oppSquadData = [];
			var oppTableView = Titanium.UI.createTableView({
				data:oppSquadData,
				top:5,
				backgroundColor:'#111111',
				separatorColor:'#000',
				scrollable:true,
				touchEnabled:true,
				rowHeight:20
			});
			var oppSquadRow = Ti.UI.createTableViewRow();
			headings = Ti.UI.createLabel({
				text:"FORWARDS",
				backgroundColor:'#111111',
				color:'#fff',
				font:{fontSize:14},
				height:'auto',
				width:'auto',
				right:5
			});
			oppSquadRow.add(headings);
			oppTableView.appendRow(oppSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			
			//Insert the forwards players
			for(t = 0 ; t<opp_squad.off.length ; t++) {
				oppSquadRow = Ti.UI.createTableViewRow();
				pl = player_names[opp_squad.off[t]];
				playerList = Ti.UI.createLabel({
					text:pl.rating + "   " +pl.first_name + " " + pl.last_name + (t == opp_squad.off.length-1 ? " (S) " : ""),
					color:'#fff',
					font:{fontSize:12},
					height:'auto',
					width:'auto',
					left:5
				});
				oppSquadRow.add(playerList);
				oppTableView.appendRow(oppSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			}
			
			oppSquadRow = Ti.UI.createTableViewRow();
			headings = Ti.UI.createLabel({
				text:"MIDFIELDERS",
				backgroundColor:'#111111',
				color:'#fff',
				font:{fontSize:14},
				height:'auto',
				width:'auto',
				right:5
			});
			oppSquadRow.add(headings);
			oppTableView.appendRow(oppSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});

			//Insert the forwards players
			for(t = 0 ; t<opp_squad.mid.length ; t++) {
				oppSquadRow = Ti.UI.createTableViewRow();
				pl = player_names[opp_squad.mid[t]];
				playerList = Ti.UI.createLabel({
					text:pl.rating + "   " +pl.first_name + " " + pl.last_name + (t == opp_squad.mid.length-1 ? " (S) " : ""),
					color:'#fff',
					font:{fontSize:12},
					height:'auto',
					width:'auto',
					left:5
				});
				oppSquadRow.add(playerList);
				oppTableView.appendRow(oppSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			}
			
			oppSquadRow = Ti.UI.createTableViewRow();
			headings = Ti.UI.createLabel({
				text:"MIDFIELDERS",
				backgroundColor:'#111111',
				color:'#fff',
				font:{fontSize:14},
				height:'auto',
				width:'auto',
				right:5
			});
			oppSquadRow.add(headings);
			oppTableView.appendRow(oppSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});

			//Insert the defenders players
			for(t = 0 ; t<opp_squad.def.length ; t++) {
				oppSquadRow = Ti.UI.createTableViewRow();
				pl = player_names[opp_squad.def[t]];
				playerList = Ti.UI.createLabel({
					text:pl.rating + "   " +pl.first_name + " " + pl.last_name + (t == opp_squad.def.length-1 ? " (S) " : ""),
					color:'#fff',
					font:{fontSize:12},
					height:'auto',
					width:'auto',
					left:5
				});
				oppSquadRow.add(playerList);
				oppTableView.appendRow(oppSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			}
			
			oppSquadRow = Ti.UI.createTableViewRow();
			headings = Ti.UI.createLabel({
				text:"GOALKEEPERS",
				backgroundColor:'#111111',
				color:'#fff',
				font:{fontSize:14},
				height:'auto',
				width:'auto',
				right:5
			});
			oppSquadRow.add(headings);
			oppTableView.appendRow(oppSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});

			//Insert the defenders players
			for(t = 0 ; t<opp_squad.gk.length ; t++) {
				oppSquadRow = Ti.UI.createTableViewRow();
				pl = player_names[opp_squad.gk[t]];
				playerList = Ti.UI.createLabel({
					text:pl.rating + "   " +pl.first_name + " " + pl.last_name + (t == opp_squad.gk.length-1 ? " (S) " : ""),
					color:'#fff',
					font:{fontSize:12},
					height:'auto',
					width:'auto',
					left:5
				});
				oppSquadRow.add(playerList);
				oppTableView.appendRow(oppSquadRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
			}
			
			oppSquadScrollView.add(oppTableView);
			
			scrollView.add(homeTeamLabel);
			scrollView.add(vsLabel);
			scrollView.add(oppTeamLabel);
			scrollView.add(homeTeamFormationLabel);
			scrollView.add(oppTeamFormationLabel);
			scrollView.add(homeTeamRatingLabel);
			scrollView.add(opponentTeamRatingLabel);
			scrollView.add(summaryHeadLabel);
			scrollView.add(summaryScrollView);
			scrollView.add(squadHeadLabel);
			scrollView.add(userSquadScrollView);
			scrollView.add(oppSquadScrollView);
			
			playMatchWindow.add(scrollView);
			playMatchWindow.open({modal:true});
			
			var counter = Ti.UI.createLabel({
				text:'Kick Off',
				font:{fontFamily:'Helvetica Neue',fontSize:15,fontWeight:'bold'},
				color:'#fff',
				textAlign:'center',
				width:'auto',
				height:'auto',
				top:5	
			});
			
			var resultData = [];
			var resultTableView = Titanium.UI.createTableView({
				data:resultData,
				top:(counter.height+counter.top+10),
				backgroundColor:'#111111',
				separatorColor:'#000',
				scrollable:true,
				touchEnabled:true,
				rowHeight:20
			});
			summaryScrollView.add(resultTableView);
			summaryScrollView.add(counter);
			
			var count = -20;
			var user_goals = 0;
			var opp_goals = 0;
			var interval = setInterval(function() {
				if(count >=0 && count < 90) {
					count++;
					for(var cc=0; cc < match_details.length ; cc++) {
						if(match_details[cc].time == count) {
							var row = Ti.UI.createTableViewRow();
							var player = player_names[match_details[cc].scorer];
							var label;
							if(match_details[cc].scoring_team == "user"){
								user_goals++;
								label = Ti.UI.createLabel({
									text:player.first_name + " " + player.last_name,
									color:'#fff',
									font:{fontSize:14},
									height:'auto',
									width:'auto',
									left:5
								});
							} else {
								opp_goals++;
								label = Ti.UI.createLabel({
									text:player.first_name + " " + player.last_name,
									color:'#fff',
									font:{fontSize:14},
									height:'auto',
									width:'auto',
									right:5
								});
							}
							
							var timeLabel = Ti.UI.createLabel({
								text:count + "'",
								color:'#fff',
								font:{fontSize:14},
								height:'auto',
								width:'auto'
							});
							vsLabel.text = user_goals + " - " + opp_goals;
							row.add(label);
							row.add(timeLabel);
							resultTableView.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
						}
					}
					counter.text = count + "'";
				} else {
					if(count == 90) {
						counter.text = "Final";
						clearInterval(interval);
					}
					count++;
				}
			},100);
		}
	}
};