// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('BattleCtrl', function ($scope,Pokemon,$firebaseArray) {
    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.

    var refMyPokemon = firebase.database().ref().child("players/" + Pokemon.getPlayer().toString() + "/chosenPokemon");
    $scope.otherPlayer = Pokemon.getPlayer() == 1 ? 2:1;

    var refOpponentPokemon = firebase.database().ref().child("players/" + $scope.otherPlayer + "/chosenPokemon");


    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    $scope.myPokemon = $firebaseArray(refMyPokemon);
    $scope.opponentPokemon = $firebaseArray(refOpponentPokemon)
});