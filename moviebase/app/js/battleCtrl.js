// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('BattleCtrl', function ($scope,Pokemon, $firebaseArray) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	var ref = firebase.database().ref().child("players/"+Pokemon.getPlayer().toString());

  $scope.otherPlayer = Pokemon.getPlayer() == 1 ? 2:1;
  	// create a synchronized array
    // click on `index.html` above to see it used in the DOM!
  	$scope.myPokemon = $firebaseArray(ref);
  	$scope.myPokemonData = $scope.myPokemon.$loaded(function() {
  		$scope.myPokemonData = $scope.myPokemon.$getRecord($scope.myPokemon.$keyAt(0)); 
  	},function(error) {
  		console.log(error);
  	});
});