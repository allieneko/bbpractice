app.factory('userFactory', function($http, $location) {
    var factory = {};

    factory.register = function(user) {
        // console.log("Inside factory register")
        $http.post('/register', user).then(function(output) {
            if(output.data){
                $location.url('/dashboard');
            }
        })
    },

    factory.check = function(cb) {
        $http.get('/check').then(function(output){
            // console.log(output)
            if(!output.data) {
                $location.url('/')
            } else {
                cb(output.data);
            }
        })
    }
    return factory;
})