// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('BattleCtrl', function ($scope,Pokemon,$firebaseObject) {
    // TODO in Lab 5: you will need to implement a method that searchers for dishes
    // including the case while the search is still running.

    var refMyPokemon = firebase.database().ref().child("players/" + Pokemon.getPlayer().toString() + "/chosenPokemon");
    $firebaseObject(refMyPokemon).$loaded().then(function() {
        $scope.myPokemon = $firebaseObject(refMyPokemon);
    //console.log(typeof $scope.myPokemon.pokemon.hp);
    $scope.data = [50];
    //console.log($scope.data);
    $scope.svg = d3.select("#myPokemonSVG");
    //console.log($scope.svg);
    $scope.g = $scope.svg.append("g");
    $scope.g.selectAll(".bar")
    .data([50])
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", function(d) {
        return d;
    })
    .attr("height", 10)
    .style("fill", "red");
});

    setTimeout(function(){
        $scope.g.selectAll(".bar").data([20]);
        d3.select("#myPokemonSVG").transition()
    .selectAll(".bar")   // change the bars
    .duration(1000)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", function(d) {
        return d;
    })
    .attr("height", 10)
    .style("fill", "blue");
},5000);




    $scope.otherPlayer = Pokemon.getPlayer() == 1 ? 2:1;
    var refOpponentPokemon = firebase.database().ref().child("players/" + $scope.otherPlayer + "/chosenPokemon");
    $firebaseObject(refOpponentPokemon).$loaded().then(function() {
        $scope.opponentPokemon = $firebaseObject(refOpponentPokemon);
    });


    var refTurn = firebase.database().ref().child("settings/turn");
    $scope.turn = $firebaseObject(refTurn);

    var refStatus = firebase.database().ref().child("settings/status");
    $scope.status = $firebaseObject(refStatus);

    $scope.playerAttacks = function(move) {
        console.log(move.length);
        $scope.opponentPokemon.pokemon.hp -= move.length;
        $scope.status.desc = $scope.myPokemon.pokemon.name + " caused " + move.length + " damage on " + $scope.opponentPokemon.pokemon.name + "!";
        $scope.turn.player = $scope.otherPlayer;
        console.log($scope.status.desc)
        if ($scope.opponentPokemon.pokemon.hp <= 0) {
            $scope.opponentPokemon.pokemon.hp = 0;
            $scope.opponentPokemon.$save().then(function() {
                alert("Opponent lost!");
            });
            $scope.turn.player = false;
        }
        $scope.opponentPokemon.$save();
        $scope.status.$save();
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

    $scope.reset = function() {
        console.log("Running reset!");
        alert("You abandoned the game :(");
        $scope.turn.player = false;
        refOpponentPokemon.remove();
        refMyPokemon.remove();
        refStatus.remove();
        $scope.turn.$save();
    }

    $scope.opponentAttacks = function(move) {
        console.log(move);
        $scope.myPokemon.pokemon.hp -= move.length;
        $scope.status.desc = $scope.opponentPokemon.pokemon.name + " caused " + move.length + " damage on " + $scope.myPokemon.pokemon.name + "!";
        if ($scope.myPokemon.pokemon.hp <= 0) {
            $scope.myPokemon.pokemon.hp = 0;
            $scope.myPokemon.$save().then(function() {
                alert("Player lost!");
            });
            $scope.turn.player = false;
            $scope.turn.$save();
        }
        $scope.status.$save();
        $scope.myPokemon.$save();
    }

    $scope.checkStatus = function() {
        if ($scope.opponentPokemon.pokemon == null)
            return ("Waiting for player " + $scope.otherPlayer + "...");
        else
            return ("HP: " + $scope.opponentPokemon.pokemon.hp);
    }

});