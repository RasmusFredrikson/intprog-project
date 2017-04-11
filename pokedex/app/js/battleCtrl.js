// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('BattleCtrl', function ($scope,Pokemon,$firebaseObject) {
    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.

    var refMyPokemon = firebase.database().ref().child("players/" + Pokemon.getPlayer().toString() + "/chosenPokemon");
    $firebaseObject(refMyPokemon).$loaded().then(function() {
        $scope.myPokemon = $firebaseObject(refMyPokemon);
    });

    
    $scope.otherPlayer = Pokemon.getPlayer() == 1 ? 2:1;
    var refOpponentPokemon = firebase.database().ref().child("players/" + $scope.otherPlayer + "/chosenPokemon");
    $firebaseObject(refOpponentPokemon).$loaded().then(function() {
        $scope.opponentPokemon = $firebaseObject(refOpponentPokemon);
    });


    var refTurn = firebase.database().ref().child("settings/turn");
    $scope.turn = $firebaseObject(refTurn);

    $scope.playerAttacks = function(move) {
        console.log(move.length);
        $scope.opponentPokemon.pokemon.hp -= move.length;
        $scope.status = $scope.myPokemon.pokemon.name + " caused " + move.length + " damage on " + $scope.opponentPokemon.pokemon.name + "!";
        if ($scope.opponentPokemon.pokemon.hp <= 0) {
            $scope.opponentPokemon.pokemon.hp = 0;
            $scope.opponentPokemon.$save().then(function() {
                alert("Opponent lost!");
            });            
        }
        $scope.opponentPokemon.$save();
        $scope.turn.player = $scope.otherPlayer;
        $scope.turn.$save();
    }

    $scope.checkTurn = function() {
        console.log($scope.turn == Pokemon.getPlayer())
        return $scope.turn.player != Pokemon.getPlayer();
    }

    $scope.printTurn = function() {
        if ($scope.turn.player != Pokemon.getPlayer()) {
            return "Opponent's";
        } else {
            return "Your";
        }
        console.log($scope.turn);
    }

    $scope.switchPokemon = function() {
        $scope.turn.player = $scope.otherPlayer;
        $scope.turn.$save();
    }

    $scope.opponentAttacks = function(move) {
        console.log(move);
        $scope.myPokemon.pokemon.hp -= move.length;
        $scope.status = $scope.opponentPokemon.pokemon.name + " caused " + move.length + " damage on " + $scope.myPokemon.pokemon.name + "!";
        if ($scope.myPokemon.pokemon.hp <= 0) {
            $scope.myPokemon.pokemon.hp = 0;
            $scope.myPokemon.$save().then(function() {
                alert("Player lost!");
            });
        }
        $scope.myPokemon.$save();
    }
    
});