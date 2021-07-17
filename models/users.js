
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

module.exports.MESSAGE_TYPES = {
    Text: "Text"
}
const User = new mongoose.Schema({
    _id: String,
    user_name: String,
    email: String,
    joined_rooms: [
        {
            _id: String,
            name: String,
        }
    ],
},
    {
        timestamps: true
    }
);

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Users', User);
