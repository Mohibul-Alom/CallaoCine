const mongoose = require('mongoose');

const { Schema } = mongoose;

const auditoriumSchema = new Schema(
    {
        name: {type: String ,required: true},
        capacity: {type: Number ,required: true},
        sessions: {type: Date ,required: true},
        movie: {type:mongoose.Types.ObjectId,ref:'Movie'}
    },
    {timestamps: true}
)

const Audotorium = mongoose.model('Audotorium',auditoriumSchema);

module.exports = Audotorium;