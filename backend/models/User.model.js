const mongoose = require('mongoose');

const { Schema }= mongoose;

const userSchema = new Schema (
    
    {
        email:{type: String, required: true},
        password:{type: String, required: true},
        role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
        name:{type: String, required: true},
        tickets:{type:mongoose.Types.ObjectId,ref:'Tickets',default:null},
    },
    {timestamps: true}
);

const User = mongoose.model('Users',userSchema);

module.exports = User;