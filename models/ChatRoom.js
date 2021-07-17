
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

module.exports.MESSAGE_TYPES = {
    Text: "Text"
}

const Message = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
    },
    user_id: String,
    message_type: String,
    send_by: String,
    message_content: String,
    user_pic_url: String
},
    {
        timestamps: true
    }
);

const ChatRoom = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
    },
    room_name: String,
    created_by: String,
    room_pic_url: String,
    room_users: [
        {
            _id: {
                type: String,
                default: () => uuidv4().replace(/\-/g, ""),
            },
            name: String,
            user_pic_url: String
        }
    ],
    conversation: [Message]
},
    {
        timestamps: true
    }
);

//Export function to create "SomeModel" model class
module.exports = mongoose.model('ChatRooms', ChatRoom);

function GetCurrentTime() {

    let options = {
        timeZone: 'Asia/Karachi',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    },

        formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date());

}