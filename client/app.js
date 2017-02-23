var app = angular.module('app', ['ngRoute', 'yaru22.angular-timeago']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/register.html',
        controller: 'userController'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'userController'
    })
    .when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'userController'
    })
    .when('/author/:author', {
        templateUrl: 'partials/author.html',
        controller: 'userController'
    })
    .otherwise({
        redirectTo: '/'
    })
})