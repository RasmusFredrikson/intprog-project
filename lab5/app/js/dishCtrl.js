// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routeParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  document.getElementsByTagName("body")[0].className = ""; // Remove background image

  $scope.dish = {};
  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.dishPrice = 0;

  //$scope.ingredients = $scope.dish.extendedIngredients;
  $scope.getNumberOfGuests = function() {
  	return Dinner.getNumberOfGuests();
  }

  $scope.addDishToMenu = function() {
    Dinner.addDishToMenu($routeParams.dishId);
  }

  $scope.getDishInfo = function() {
  	Dinner.Dish.get({id:$routeParams.dishId}, function(data){
  		$scope.dish = data;
  		$scope.dishPrice = Dinner.getDishPrice(data);
      Dinner.setPendingPrice($scope.dishPrice);
  	},function(data){
  		$scope.status = "There was an error";
  	});
  }

  $scope.setPendingPrice = function(num) {
    Dinner.setPendingPrice(num);
  }

  $scope.getDishInfo();
  

});