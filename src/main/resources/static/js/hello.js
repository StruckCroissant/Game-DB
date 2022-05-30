angular.module("uiApp", [])
    .controller("hello", function($scope) {
        $scope.testGreeting = {id: 'xxx', content: 'Hello World!'}
    });