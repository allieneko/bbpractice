var mongoose = require('mongoose');
var User = mongoose.model('User');
var Quote = mongoose.model('Quote');

module.exports = (function () {
    return {
        add: function (req, res) {
            req.body._user = req.session.user._id;
            var newQuote = new Quote(req.body)
            console.log(newQuote)
            newQuote.save(function (err) {
                if (err) {
                    res.json({ status: false })
                } else {
                    res.json({ status: true, quote: newQuote });
                }
            })
        },
        getQuotes: function (req, res) {
            Quote.find({})
                .populate('_user')
                .exec(function (err, data) {
                    res.json({ quotes: data, user: req.session.user })
                })
        },

        likeQuote: function (req, res) {
            Quote.findOne({ _id: req.params.id }, function (err, data) {
                var index = data.liked_by.indexOf(req.session.user._id);
                if (index < 0) {
                    data.liked_by.push(req.session.user._id);
                    Quote.findByIdAndUpdate(req.params.id, { $addToSet: { liked_by: req.session.user._id } }, function (err, quote) {
                        console.log("Like count " + data)

                        res.json(data);
                    })
                } else {

                    data.liked_by.splice(index, 1);
                    Quote.findByIdAndUpdate(req.params.id, { $pull: { liked_by: req.session.user._id } }, function (err, quote) {
                        console.log("Like count " + data)
                        res.json(data);
                    })
                }
            })
        },
        findOneAuthor: function (req, res) {
            console.log(req.params.author)
            var author = req.params.author;
            Quote.find({ attribution: author })
                .populate('_user')
                .exec(function (err, data) {
                    res.json({ quotes: data, user: req.session.user })
                }) 
            },
        }
})()