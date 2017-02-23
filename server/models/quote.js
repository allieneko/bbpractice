var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuoteSchema = new Schema({
    quote: {type: String, minlength: 1, required: true},
    attribution: {type: String, minlength: 1, required: true},
    date: {type: Date, required: true},
    liked_by: [{type: Schema.Types.ObjectId, ref: 'User'}],
    _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},

},
{timestamps: true})

mongoose.model('Quote', QuoteSchema)