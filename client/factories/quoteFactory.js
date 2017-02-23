app.factory('quoteFactory', function ($http, $location, $routeParams) {
    var factory = {};


/////
var Mergesort = (function() {
  /**
   * Sorts the array by breaking it down
   * into smaller chunks.
   *
   * @param {Array} array The array to sort
   */
  function sort(array) {

    var length = array.length,
        mid    = Math.floor(length * 0.5),
        left   = array.slice(0, mid),
        right  = array.slice(mid, length);

    if(length === 1) {
      return array;
    }

    return merge(sort(left), sort(right));

  }

  /**
   * Merges two sublists back together.
   * Shift either left or right onto
   * the result depending on which is
   * lower (assuming both exist), and simply
   * pushes on a list if the other doesn't
   * exist.
   *
   * @param {Array} left The left hand sublist
   * @param {Array} right The right hand sublist
   */
  function merge(left, right) {

    var result = [];

    while(left.length || right.length) {

      if(left.length && right.length) {

        if(left[0].likecount > right[0].likecount) {
          result.push(left.shift());
        } else {
          result.push(right.shift());
        }

      } else if (left.length) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }

    }

    return result;

  }

  return {
    sort: sort
  };

})();

/////////////////

    factory.addQuote = function (quote, callback) {

        $http.post('/addquote', quote).then(function (output) {
            if (!output.data.status) {
                alert("Something went wrong! Please try again")
            } else {
                callback(output.data);
            }
        })
    };

    factory.getQuotes = function (callback) {
        $http.get('/getall').then(function (output) {
            for (var i = 0; i < output.data.quotes.length; i++) {
                output.data.quotes[i].likecount = output.data.quotes[i].liked_by.length;
                if (output.data.quotes[i].liked_by.indexOf(output.data.user._id) > -1) {
                    output.data.quotes[i].userlike = 'Unlike';
                } else {
                    output.data.quotes[i].userlike = 'Like';
                }
                var sortedArray = Mergesort.sort(output.data.quotes);

                callback(sortedArray);
            }
        })
    };

    factory.likeQuote = function (id, callback) {
        // console.log(id)
        $http.get('/like/' + id).then(function (output) {
            callback(output.data)
            // console.log(output.data.liked_by)
        })
    };

    factory.findOneAuthor = function (author, callback) {
        $http.get('/author/' + author).then(function (output) {
            for (var i = 0; i < output.data.quotes.length; i++) {
                output.data.quotes[i].likecount = output.data.quotes[i].liked_by.length;
                if (output.data.quotes[i].liked_by.indexOf(output.data.user._id) > -1) {
                    output.data.quotes[i].userlike = 'Unlike';
                } else {
                    output.data.quotes[i].userlike = 'Like';
                }
                callback(output.data.quotes);
            }
        })
    }
    return factory;
})




