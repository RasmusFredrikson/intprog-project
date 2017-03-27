// Search controller that we use whenever we have a search inputs
// and search results
moviePlannerApp.controller('SearchCtrl', function ($scope,Movie) {
	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.

	$scope.search = function(query,type) {
		$scope.status = "Searching...";
		Movie.MovieSearch.get({},function(data){
			console.log(data);
			//$scope.movies=data.results;
			//$scope.status = "Showing " + data.results.length + " results";
		},function(data){
			$scope.status = "There was an error";
		});
	}
	
});