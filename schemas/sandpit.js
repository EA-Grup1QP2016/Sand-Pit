
// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db
var sandpitSchema = new Schema({
    username: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    favlang: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}

    //name: { type: String, required: true, unique: true },
    //location: { type: String, required: true },
    //prize: { type: Number },
    //description: { type: String },
    //coordinates: {
    //    longitude: Number,
    //    latitude: Number
    //},
    //contact_phone: { type: Number }
});

// Sets the created_at parameter equal to the current time
sandpitSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
sandpitSchema.index({location: '2dsphere'});

// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('Sandpit', sandpitSchema);