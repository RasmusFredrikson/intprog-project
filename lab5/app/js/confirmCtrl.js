// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('ConfirmCtrl', function ($scope,Dinner) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	document.getElementsByTagName("body")[0].className = ""; // Remove background image

	$scope.starterPrice = 0;
	$scope.mainDishPrice = 0;
	$scope.dessertPrice = 0;
	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	$scope.createMenu = function() {
		$scope.starter = Dinner.getSelectedDish("starter");
		if ($scope.starter != null) {
			$scope.starterPrice = Dinner.getDishPrice($scope.starter);
		} else {
			$scope.starterPlaceholder = "No starter added";
		}
		$scope.mainDish = Dinner.getSelectedDish("main dish");
		if ($scope.mainDish != null) {
			$scope.mainDishPrice = Dinner.getDishPrice($scope.mainDish);
		} else {
			$scope.mainDishPlaceholder = "No main dish added";
		}
		$scope.dessert = Dinner.getSelectedDish("dessert");
		if ($scope.dessert != null) {
			$scope.dessertPrice = Dinner.getDishPrice($scope.dessert);
		} else {
			$scope.dessertPlaceholder = "No main dish added";
		}

		$scope.totalMenuPrice = Dinner.getTotalMenuPrice();

		/*
		if (this.starter != null) this.starterThumbnail.html('<a href="#" class="thumbnail"><img class="img100" src="' + this.starter.image + ' " alt="' + this.starter.title + ' "><strong class="blackColor">' + this.starter.title + '</strong><p class="blackColor">' + model.getDishPrice(this.starter) + '&nbsp; SEK</p></a>');
		else this.starterThumbnail.html("No starter added");
		if (this.mainDish != null) this.mainDishThumbnail.html('<a href="#" class="thumbnail"><img class="img100" src="' + this.mainDish.image + ' " alt="' + this.mainDish.title + ' "><strong class="blackColor">' + this.mainDish.title + '</strong><p class="blackColor">' + model.getDishPrice(this.mainDish) + '&nbsp; SEK</p></a>');
		else this.mainDishThumbnail.html("No main dish added");
		if (this.dessert != null) this.dessertThumbnail.html('<a href="#" class="thumbnail"><img class="img100" src="' + this.dessert.image + ' " alt="' + this.dessert.title + ' "><strong class="blackColor">' + this.dessert.title + '</strong><p class="blackColor">' + model.getDishPrice(this.dessert) + '&nbsp; SEK</p></a>');
		else this.dessertThumbnail.html("No dessert added");
		*/

	}

	$scope.createMenu();

	
});