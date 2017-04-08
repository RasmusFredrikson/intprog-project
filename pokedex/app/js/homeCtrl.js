// Movie controller that we use whenever we have view that needs to 
// display or modify the Movie menu
pokemonPlannerApp.controller('HomeCtrl', function ($scope,Pokemon, $firebaseObject) {

	// TODO in Lab 5: Implement the methods to get the Movie menu
	var refPlayer = firebase.database().ref().child("settings/");
	var player1 = $firebaseObject(refPlayer.child("1"));
	var player2 = $firebaseObject(refPlayer.child("2"));

	if(Pokemon.getPlayer()==1){
		player1.occupied = false;
		player1.$save();
	}

	else if(Pokemon.getPlayer()==2){
		player2.occupied = false;
		player2.$save();
	}

	$scope.checkPlayer = function(player){
		if(player=="1"){
			return player1.occupied
		}
		if(player=="2"){
			return player2.occupied
		}
	}


	// add dish to menu and get total menu price
	$scope.setPlayer = function(player) {
		Pokemon.setPlayer(player);
		
		if(player=="1"){
			player1.occupied = true;
			player1.$save();
		}
		else if(player=="2"){
			player2.occupied = true;
			player2.$save();
		}
	}
});