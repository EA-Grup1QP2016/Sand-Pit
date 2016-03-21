var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var Sandpit = mongoose.model('Sandpit');

var userSchema = new Schema({
    email: String,
    fullName: String,
    password: String,
    admin: Boolean
    //idSandpit: { type: Schema.ObjectId, ref: "Sandpit"}
});

module.exports = mongoose.model('User', userSchema);