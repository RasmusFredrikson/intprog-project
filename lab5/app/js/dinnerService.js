// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {

    var numberOfGuests = $cookieStore.get('numberOfGuests')!= null ? $cookieStore.get('numberOfGuests'):1;
    var selectedDishes = [];
    var observers = [];
    var chosenDish = 1;
    var pendingPrice = 0;

    this.getPendingPrice = function(){
        return pendingPrice*numberOfGuests;
    }

    this.setPendingPrice = function(num) {
        pendingPrice = num;
    }

    this.getChosenDish = function(){
        return chosenDish;
    }

    this.setChosenDish = function(id){
        chosenDish = id;
    }

    this.setNumberOfGuests = function(num) {
        if (num > 99) {
            numberOfGuests = 99;
        } else if (num < 0) {
            numberOfGuests = 0;
        } else {
            numberOfGuests = num;
        }
        $cookieStore.put('numberOfGuests',numberOfGuests);
    }

    // should return 
    this.getNumberOfGuests = function() {
        return numberOfGuests;
    }

    //Returns the dish that is on the menu for selected type
    this.getSelectedDish = function(type) {
        for (var i = 0; i < selectedDishes.length; i++) {
            var dishTypes = selectedDishes[i].dishTypes;
            for (var j = 0; j < dishTypes.length; j++) {
                if(dishTypes[j] == type) {
                    return selectedDishes[i];
                }
            }
        }
        return null;
    }

    //Returns all the dishes on the menu.
    this.getFullMenu = function() {
        return selectedDishes.sort();
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function() {
        var sum = 0;
        for (var i = 0; i < selectedDishes.length; i++) {
            sum += this.getDishPrice(selectedDishes[i]);
        }
        return sum;
    }

    this.getDishPrice = function(dish) {
        var sum = 0;
        dish.extendedIngredients.forEach(function(ingredient) {sum += ingredient.amount});
        var totalPrice = Math.round((sum * this.getNumberOfGuests())*100)/100;
        return totalPrice;
    }

    //Adds the passed dish to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function(dishId) {
        this.Dish.get({id:dishId}, dish => {
            var type;

            for (var i = 0; i < dish.dishTypes.length; i++) {
                if (dish.dishTypes[i] == "main dish" || dish.dishTypes[i] == "starter" || dish.dishTypes[i] == "dessert")
                    type = dish.dishTypes[i];
                if (this.getSelectedDish(dish.dishTypes[i]) != null){
                    this.removeDishFromMenu(this.getSelectedDish(dish.dishTypes[i]).id,false);
                    break;                   
                }
            }
            selectedDishes.push(dish);
            $cookieStore.put(type,dish.id);
        });     
    }

    //Removes dish from menu
    this.removeDishFromMenu = function(dishId,removeFlag) {
        this.Dish.get({id:dishId}, dish => {
            var type;
            for (var i = 0; i < selectedDishes.length; i++) {
                if (selectedDishes[i].id == dishId){
                    console.log(removeFlag)
                    for (var j = 0; j < dish.dishTypes.length; j++) {
                        if (removeFlag && (dish.dishTypes[j] == "main dish" || dish.dishTypes[j] == "starter" || dish.dishTypes[j] == "dessert")){
                            type = dish.dishTypes[j];
                            $cookieStore.remove(type);
                        }
                    }
                    selectedDishes.splice(i, 1);
                    return true;
                }
            }
            return false;
        });
    }

    this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
        get: {
            headers: {
                'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
            }
        }
    });
    this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
        get: {
            headers: {
                'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
            }
        }
    });

    if ($cookieStore.get('starter')!=null)
        this.addDishToMenu($cookieStore.get('starter'));
    if ($cookieStore.get('main dish')!=null)
        this.addDishToMenu($cookieStore.get('main dish'));    
    if ($cookieStore.get('dessert')!=null)
        this.addDishToMenu($cookieStore.get('dessert'));




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