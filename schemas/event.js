var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Sandpit = mongoose.model('Sandpit');
var User = mongoose.model('User');


var eventSchema = new Schema({
    name: 		    { type: String, required: true, unique: true },
    date: 		    { type: String, required: false },
    description:    { type: String },
    duration:  	    { type: String, required: false },
    creator:        { type: String},
    location:       { type: String},
    users:       [{type: String}]
});


module.exports = mongoose.model('Event', eventSchema);





