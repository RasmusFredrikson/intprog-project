// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
pokemonPlannerApp.factory('Pokemon',function ($resource) {

    // Set the configuration for your app
    // TODO: Replace with your project's config object
    var config = {
        apiKey: "AIzaSyCopvBmpePv8mlx529uPfA2YZ9DJWve5qA",
        authDomain: "pokedex-baee2.firebaseapp.com",
        databaseURL: "https://pokedex-baee2.firebaseio.com/",
        storageBucket: "pokedex-baee2.appspot.com"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();

    this.addPokemon = function(pokemon){
        var ref = database.ref("pokemon")
        ref.child(pokemon.national_id).set({
            id: pokemon.national_id,
            name: pokemon.name
        })
    }

    // Get all pokémon in the database
    this.getAllPokemon = function() {
        var ref = database.ref("pokemon");
        ref.once('value').then(function(snapshot) {
            console.log(snapshot.val());
        });
    }

    // Get a pokémon with a specified id
    this.getPokemon = function(id) {
        var ref = database.ref("pokemon/" + id);
        ref.once('value').then(function(snapshot) {
            console.log(snapshot.val());
        });
    }

    this.PokemonSearch = $resource('http://pokeapi.co/api/v1/pokemon/:id/',{},{
        get: {
            headers: 
            {
                'Accept': 'application/json'
            }
        }
    });

    this.Pokemon = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
        get: {
            headers: {
                'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
            }
        }
    });






// TODO in Lab 5: Add your model code from previous labs
// feel free to remove above example code
// you will need to modify the model (getDish and getAllDishes) 
// a bit to take the advantage of Angular resource service
// check lab 5 instructions for details





// Angular service needs to return an object that has all the
// methods created in it. You can consider that this is instead
// of calling var model = new DinnerModel() we did in the previous labs
// This is because Angular takes care of creating it when needed.
return this;

});