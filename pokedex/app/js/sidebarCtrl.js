// Movie controller that we use whenever we have view that needs to 
// display or modify the Movie menu
pokemonPlannerApp.controller('SidebarCtrl', function ($scope,Pokemon, $firebaseArray) {

	$scope.getAllPokemon = function() {
		Pokemon.getAllPokemon();
	}

	$scope.getPokemon = function(id) {
		Pokemon.getPokemon(id);
	}

    var refMyPokemon = firebase.database().ref().child("players/" + Pokemon.getPlayer().toString());

	$firebaseArray(refMyPokemon).$loaded().then(function() {
    	$scope.myPokemon = $firebaseArray(refMyPokemon);
    });

  	$scope.sortMyPokemon = function() {
  		return Pokemon.sort($scope.myPokemon);
  	}

});