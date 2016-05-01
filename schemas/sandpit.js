/**
 * Created by Feliu on 23/04/2016.
 */
// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
var SandpitSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    facilities: [String], //String de instalaciones
    price: {type: Number, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    creator: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets the created_at parameter equal to the current time
SandpitSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
SandpitSchema.index({location: '2dsphere'});

// . Sets the MongoDB collection to be used as: "sandpit"
module.exports = mongoose.model('Sandpit', SandpitSchema);