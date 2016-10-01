'use strict';

// grab the packages needed for the person model
var mongoose          = require('mongoose'),
    Schema            = mongoose.Schema;

// person schema
var PersonSchema        = new Schema({
    nickname:       { type: String, required: true, index: { unique: true }},
    firstname:      { type: String },
    lastname:       { type: String },
    created: Date,
    updated: [Date]
});

// return the model
module.exports = mongoose.model('Person', PersonSchema);
