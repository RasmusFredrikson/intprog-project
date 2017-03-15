// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

	document.getElementsByTagName("body")[0].className = ""; // Remove background image

	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.pendingPrice = Dinner.getPendingPrice();
	$scope.menuPrice = (Dinner.getTotalMenuPrice() + Dinner.getPendingPrice());

	$scope.setNumberOfGuests = function(number){
		Dinner.setNumberOfGuests(number);
		$scope.numberOfGuests = Dinner.getNumberOfGuests();
	}

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

	/* Calculates the total sum of the menu */
	$scope.calcMenuPrice = function() {
		return (Dinner.getTotalMenuPrice() + Dinner.getPendingPrice());
	}

	$scope.getDishPrice = function(dish) {
		return Dinner.getDishPrice(dish);
	}
	$scope.getPendingPrice = function() {
		return Dinner.getPendingPrice();
	}
	$scope.removeDish = function(id) {
		Dinner.removeDishFromMenu(id,true);
	}

	$scope.menu = Dinner.getFullMenu();


  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});