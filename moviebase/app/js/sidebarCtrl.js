// Movie controller that we use whenever we have view that needs to 
// display or modify the Movie menu
pokemonPlannerApp.controller('SidebarCtrl', function ($scope,Pokemon) {

	// TODO in Lab 5: Implement the methods to get the Movie menu
	// add dish to menu and get total menu price
	$scope.search = function(query,type) {
		$scope.status = "Searching...";
		Pokemon.PokemonSearch.get({query:query,type:type},function(data){
			$scope.pokemon=data.results;
			$scope.status = "Showing " + data.results.length + " results";
		},function(data){
			$scope.status = "There was an error";
		});
	}

	$scope.getAllPokemon = function() {
		Pokemon.getAllPokemon();
	}

	$scope.getPokemon = function(id) {
		Pokemon.getPokemon(id);
	}

});