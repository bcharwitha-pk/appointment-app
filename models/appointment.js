var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
    patientId: {type: String, required: true},
    patient: {type: String, required: true},
    date: {type: String, default: Date.now()},
    slot: {type: String, required: true},
    status: { type: String, default: 'upcoming' },
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    createdBy: {type: String, required: true},
    modifiedOn: {type: Date, default: Date.now()},
    createdOn: {type: Date, default: Date.now(), required: false}
});

var Appointment = mongoose.model('Appointment', appointmentSchema, 'appointment');
module.exports = Appointment
