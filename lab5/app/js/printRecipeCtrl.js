// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('PrintRecipeCtrl', function ($scope,Dinner) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	document.getElementsByTagName("body")[0].className = ""; // Remove background image

	$scope.dishes = Dinner.getFullMenu();
});