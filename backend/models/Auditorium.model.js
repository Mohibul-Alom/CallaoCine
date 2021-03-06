const mongoose = require('mongoose');

const { Schema } = mongoose;

const auditoriumSchema = new Schema(
    {
        name: {type: String ,required: true},
        capacity: {type: Number ,required: true, default:64},
    },
    {timestamps: true}
)

const Auditorium = mongoose.model('Auditoriums',auditoriumSchema);

module.exports = Auditorium;