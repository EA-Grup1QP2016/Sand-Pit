var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var sandpitSchema = new Schema({
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    prize: { type: Number },
    description: { type: String },
    coordinates: {
        longitude: Number,
        latitude: Number
    },
    contact_phone: { type: Number }
});


module.exports = mongoose.model('Sandpit', sandpitSchema);


