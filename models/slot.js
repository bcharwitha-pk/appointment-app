var mongoose = require('mongoose');

var slotSchema = new mongoose.Schema({
    doctor: { type: String, required: true},
    date: {type: String, default: Date.now()},
    slot: {type: Array, required: true},
    booked: {type: Number, default: 0},
    total: {type: Number, defualt: 3}
});

var Slot = mongoose.model('Slot', slotSchema, 'slot');
module.exports = Slot
