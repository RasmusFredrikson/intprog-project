// Movie controller that we use whenever we have view that needs to 
// display or modify the Movie menu
pokemonPlannerApp.controller('HomeCtrl', function ($scope,Pokemon, $firebaseObject) {

	// TODO in Lab 5: Implement the methods to get the Movie menu
	// add dish to menu and get total menu price
	$scope.setPlayer = function(player) {
		Pokemon.setPlayer(player);
		var player = $firebaseObject(firebase.database().ref().child("settings/"+Pokemon.getPlayer().toString()));
		player.occupied = true;
		player.$save();
	}
});