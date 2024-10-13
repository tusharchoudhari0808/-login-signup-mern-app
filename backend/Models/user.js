const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,  // Correct capitalization for the type
    
    },
    email: {
        type: String,
        required: true,  // Email should be required as well
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Creating a User model from the schema
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
