var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var Sandpit = mongoose.model('Sandpit');

var userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    fullName: { type: String, required: true},
    location: { type: String, required: true},
    password: { type: String, required: false }
    //admin: Boolean
    //idSandpit: { type: Schema.ObjectId, ref: "Sandpit"}
});

module.exports = mongoose.model('User', userSchema);