// Movie controller that we use whenever we have view that needs to 
// display or modify the Movie menu
moviePlannerApp.controller('SidebarCtrl', function ($scope,Movie) {

	// TODO in Lab 5: Implement the methods to get the Movie menu
	// add dish to menu and get total menu price
	$scope.search = function(query,type) {
		$scope.status = "Searching...";
		Movie.MovieSearch.get({query:query,type:type},function(data){
			$scope.movies=data.results;
			$scope.status = "Showing " + data.results.length + " results";
		},function(data){
			$scope.status = "There was an error";
		});
	}

});