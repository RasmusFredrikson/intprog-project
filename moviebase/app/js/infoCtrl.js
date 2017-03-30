// Dinner controller that we use whenever we want to display detailed
// information for one dish
pokemonPlannerApp.controller('InfoCtrl', function ($scope,$routeParams,Pokemon) {

  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  console.log("Running InfoCtrl!");

  Pokemon.PokemonSearch.get({id:$routeParams.pokeId},function(data){
  	console.log(data);
  	$scope.pokemon = data;
  	console.log($scope.pokemon);
  	console.log($scope.pokemon.descriptions[0].resource_uri.substr(1));
  	Pokemon.getDescription.get({link:$scope.pokemon.descriptions[0].resource_uri.substr(1)},function(desc){
  		$scope.description = desc.description;
  	});
  	$scope.addUserPokemon(data);
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
  
  $scope.addUserPokemon = function(pokemon) {
  	Pokemon.addUserPokemon(pokemon);
  }


  


  
  
});