var user = require('./../controllers/user.js')
var quote = require('./../controllers/quote.js')

module.exports = function (app) {
    app.post('/register', user.register);
    app.get('/check', user.check);
    app.get('/logout', user.logout);
    app.post('/addquote', quote.add);
    app.get('/getall', quote.getQuotes);
    app.get('/like/:id', quote.likeQuote);
    app.get('/author/:author', quote.findOneAuthor);
}