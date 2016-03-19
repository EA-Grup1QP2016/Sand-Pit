var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Sandpit = mongoose.model('Sandpit');
var User = mongoose.model('User');


var eventSchema = new Schema({
    name: 		    { type: String, required: true, unique: true },
    date: 		    { type: Date, required: true },
    description:    { type: String },
    duration:  	    { type: String, required: true },
    creator:        { type: Schema.ObjectId, ref: "User"},
    idSandpit:      { type: Schema.ObjectId, ref: "Sandpit"}
});


module.exports = mongoose.model('Event', eventSchema);





