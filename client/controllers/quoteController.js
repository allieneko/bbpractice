app.controller('quoteController', function ($scope, $location, $routeParams, timeAgo, nowTime, userFactory, quoteFactory) {

    $scope.limit = 3;
    // if ($location.url('/dashboard')) {
    quoteFactory.getQuotes(function (data) {
        $scope.quotes = data;
    })
    // };

    $scope.showAll = function () {
        $scope.limit = $scope.quotes.length;
    }

    $scope.addQuote = function () {
        $scope.errors = [];
        today = Date.now();

        if (!$scope.newQuote || !$scope.newQuote.quote || !$scope.newQuote.attribution) {
            $scope.errors.push('All fields are required')
        }
        if ($scope.newQuote.date == null) {
            $scope.errors.push('Please enter a date')
        }
        if ($scope.newQuote.date > today) {
            $scope.errors.push("You\'re not a timetraveler")

        } else {
            quoteFactory.addQuote($scope.newQuote, function (data) {
                quoteFactory.getQuotes(function (data) {
                    $scope.quotes = data;
                })
                $location.url('/dashboard');
            })
        }
    },

        $scope.likeQuote = function (quote, index) {
            quoteFactory.likeQuote(quote._id, function (data) {
                // $location.url('/dashboard');
                console.log(data)
            })
            likeToggle(quote, index)
        };

    function likeToggle(quote, index) {
        if (quote.userlike == 'Unlike') {
            $scope.quotes[index].likecount -= 1;
            $scope.quotes[index].userlike = 'Like';
        } else {
            $scope.quotes[index].likecount += 1;
            $scope.quotes[index].userlike = 'Unlike';
        }


    };

    if ($routeParams.author) {
        quoteFactory.findOneAuthor($routeParams.author, function (data) {
            $scope.authorQuotes = data;
            console.log(data)
        })
    }
})
