// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('SearchCtrl', function ($scope,Pokemon) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	$scope.search = function(query,type) {
		$scope.status = "Searching...";
		Pokemon.PokemonSearch.get({},function(data){
			console.log(data);
			$scope.pokemon = data.pokemon;
			for (var i = 0; i < $scope.pokemon.length; i++) {
				console.log($scope.pokemon[i].name);
			}
			console.log($scope.pokemon.length);
			//$scope.movies=data.results;
			//$scope.status = "Showing " + data.results.length + " results";
		},function(data){
			$scope.status = "There was an error";
		});
	}
	
});