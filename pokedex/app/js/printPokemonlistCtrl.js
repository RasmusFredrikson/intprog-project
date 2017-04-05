// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('PrintPokemonlistCtrl', function ($scope,Pokemon, $firebaseArray, $firebaseObject) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	var ref = firebase.database().ref().child("players");
  var refChosenPokemon = firebase.database().ref().child("players/"+Pokemon.getPlayer().toString()+"/chosenPokemon")
  	// create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    $scope.myPokemon = $firebaseArray(ref);
    $scope.chosenPokemon = $firebaseObject(refChosenPokemon);

    $scope.myPokemonData = $scope.myPokemon.$loaded(function() {
      $scope.myPokemonData = $scope.myPokemon.$getRecord(Pokemon.getPlayer().toString()); 
    },function(error) {
      console.log(error);
    });

    $scope.setChosenPokemon = function(poke) {
      $scope.chosenPokemon.pokemon = poke;
      $scope.chosenPokemon.$save();
    }
});