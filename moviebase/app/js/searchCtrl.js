// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('SearchCtrl', function ($scope,Pokemon) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	$scope.search = function() {
		$scope.status = "Searching...";
		for (var i = 1; i <= 1 ; i++) {
			Pokemon.PokemonSearch.get({id:i},function(data){
				console.log(data);
				$scope.pokemonData = data;
				console.log($scope.pokemonData);
				//Pokemon.addPokemon(data)
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
	
	// Not working because of asynchronous call or something...
	$scope.getAllPokemon = function() {
		$scope.pokemon = Pokemon.getAllPokemon();
		console.log($scope.pokemon.length);
		console.log($scope.pokemon);
		console.log($scope.pokemon.length);
		console.log(typeof $scope.pokemon);
	}

	$scope.getPokemon = function(id) {
		$scope.pokemon = Pokemon.getPokemon(id);
		console.log($scope.pokemon);
	}
	
});