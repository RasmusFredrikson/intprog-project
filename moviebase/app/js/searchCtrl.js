// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('SearchCtrl', function ($scope,Pokemon, $firebaseArray) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	var ref = firebase.database().ref().child("messages"); 
	// create a synchronized array
  	// click on `index.html` above to see it used in the DOM!
  	$scope.messages = $firebaseArray(ref);

  	$scope.player = Pokemon.getPlayer();

  	$scope.search = function() {
  		$scope.status = "Searching...";
  		for (var i = 1; i <= 151 ; i++) {
  			Pokemon.PokemonSearch.get({id:i},function(data){
  				//console.log(data);
  				$scope.pokemonData = data;
  				console.log($scope.pokemonData.name);
  				//$scope.player = $scope.messages.$getRecord(Pokemon.getPlayer().toString());  	
  				$scope.messages.$add({pokemon:$scope.pokemonData});
    			//$scope.pokemon = data.pokemon;
				//console.log(data.pokemon);
				/*for (var i = 0; i < $scope.pokemon.length; i++) {
					console.log($scope.pokemon[i].name);
				}
				*/
				//console.log($scope.pokemon.length);
				//$scope.movies=data.results;
				//$scope.status = "Showing " + data.results.length + " results";
			},function(data){
				$scope.status = "There was an error";
			});
  		}
  	}

	$scope.getPokemon = function(id) {
		$scope.pokemon = Pokemon.getPokemon(id);
		console.log($scope.pokemon);
	}
});