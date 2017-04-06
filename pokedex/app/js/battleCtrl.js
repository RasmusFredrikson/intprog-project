// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('BattleCtrl', function ($scope,Pokemon,$firebaseObject) {
    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.

    var refMyPokemon = firebase.database().ref().child("players/" + Pokemon.getPlayer().toString() + "/chosenPokemon");
    $scope.otherPlayer = Pokemon.getPlayer() == 1 ? 2:1;

    var refOpponentPokemon = firebase.database().ref().child("players/" + $scope.otherPlayer + "/chosenPokemon");

    // create a synchronized object
    // click on `index.html` above to see it used in the DOM!
    $firebaseObject(refMyPokemon).$loaded().then(function() {
    	$scope.myPokemon = $firebaseObject(refMyPokemon);
    	console.log($scope.myPokemon);
    });

    $firebaseObject(refOpponentPokemon).$loaded().then(function() {
        $scope.opponentPokemon = $firebaseObject(refOpponentPokemon);
    });

    $scope.playerAttacks = function(move) {
        console.log(move.length);
        $scope.opponentPokemon.pokemon.hp -= move.length;
        if ($scope.opponentPokemon.pokemon.hp <= 0) {
            $scope.opponentPokemon.pokemon.hp = 0;
            console.log("Opponent lost!");
        }
        $scope.opponentPokemon.$save();
    }

    $scope.opponentAttacks = function(move) {
        console.log(move);
        $scope.myPokemon.pokemon.hp -= move.length;
        if ($scope.myPokemon.pokemon.hp <= 0) {
            $scope.myPokemon.pokemon.hp = 0;
            console.log("Player lost!");
        }
        $scope.myPokemon.$save();
    }
    
});