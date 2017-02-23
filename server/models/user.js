var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String, minlength: 3, required: true},
	_quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
})

mongoose.model('User', UserSchema);