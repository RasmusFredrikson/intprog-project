// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('SearchCtrl', function ($scope,Pokemon, $firebaseArray) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	var ref = firebase.database().ref().child("pokemon"); 
	// create a synchronized array
  	// click on `index.html` above to see it used in the DOM!
  	$scope.pokedex = $firebaseArray(ref);

  	$scope.player = Pokemon.getPlayer();

  	$scope.search = function() {
  		$scope.status = "Running search...";
  		for (var i = 1; i <= 151 ; i++) {
  			Pokemon.PokemonSearch.get({id:i},function(poke){
  				$scope.pokedex.$add({pokemon:poke});
  				//ref.remove()
  			},function(poke){
  				$scope.status = "There was an error";
  			});
  		}
  	}

  	$scope.sortPokedex = function() {
  		return Pokemon.sort($scope.pokedex);
  	}
});