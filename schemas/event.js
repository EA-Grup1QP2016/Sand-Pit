var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Sandpit = mongoose.model('Sandpit');
var User = mongoose.model('User');


var eventSchema = new Schema({
    name: 		    { type: String, required: true, unique: true },
    date: 		    { type: Date, required: true },
    description:    { type: String },
    duration:  	    { type: String, required: true },
    creator:        { type: String},
    location:       { type: String},
    users:       [{ type: String}]
});


module.exports = mongoose.model('Event', eventSchema);





