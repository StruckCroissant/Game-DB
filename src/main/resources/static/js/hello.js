angular.module("index", ["$scope"])
    .controller("index", function($scope) {
        $scope.greeting = {id: 'xxx', content: 'Hello World!'}
    });