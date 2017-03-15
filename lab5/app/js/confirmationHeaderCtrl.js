dinnerPlannerApp.controller('ConfirmationHeaderCtrl', function ($scope,Dinner) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	document.getElementsByTagName("body")[0].className = ""; // Remove background image

	$scope.numberOfGuests = Dinner.getNumberOfGuests();
});