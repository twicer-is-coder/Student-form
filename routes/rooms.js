const express = require('express');
const router = express.Router();

const RoomsCollection = require('../models/ChatRoom');
const UsersCollection = require('../models/users');

const MESSAGE_TYPES = {
    Text: "Text"
}

router.use(express.json());

router.get('/:roomId', (req, res) => {
    console.log(req.params);
    res.send('ROOM ROUTE GET PARAM REQUEST')
})

router.post('/message', (req, res) => {
    console.log(req.body)
    res.send('ROOM MESSAGE ROUTE POST PARAM REQUEST')
})

router.post('/', (req, res) => {

    const { uid, displayName, photoURL, RoomName, RoomPictureURL } = req.body;
    console.log(uid, displayName, photoURL, RoomName, RoomPictureURL)

    var NewRoom = RoomsCollection({

        room_name: RoomName,
        created_by: displayName,
        room_pic_url: RoomPictureURL,
        room_users: [
            {
                name: displayName,
                _id: uid,
                user_pic_url: photoURL
            }
        ],
        conversation: []
    });
    NewRoom.save((err, room) => {
        if (err) {
            console.log(err)
            res.status(201).send("Failed to Create Room!");
        }

        else {
            console.log('Room Created', room);
            UsersCollection.updateOne({uid: uid}, {
                $push: {
                    "joined_rooms": {
                        _id: room._id,
                        name: room.room_name
                    }
                }
            },
                (err, user) => {
                    if (err) {
                        console.log(err)
                        RoomsCollection.deleteOne({ _id: room._id })
                            .then(() => console.log("Room deleted"))
                            .catch(error => console.log(error));
                        res.status(201).send("Failed to Add User To Room! Room is deleted.");
                    }
                    else {
                        console.log('User Rooms Updated', user)
                        res.status(200).send(room);
                    }
                }
            );

        }

    });

})

module.exports = router;

   // var NewRoom = RoomsCollection({

    //     room_name: "First Room",
    //     created_by: "Saad Nadeem",
    //     room_pic_url: String,
    //     room_users: [
    //         {
    //             name: "Saad",
    //             user_id: "123",
    //             user_pic_url: "google.com"
    //         }
    //     ],
    //     conversation: [
    //         {
    //             user_id: "111",
    //             message_type: MESSAGE_TYPES.Text,
    //             send_by: "Ali",
    //             message_content: "Yeah Exactly",
    //             user_pic_url: "facebook.com"
    //         },
    //         {
    //             user_id: "111",
    //             message_type: MESSAGE_TYPES.Text,
    //             send_by: "Ali",
    //             message_content: "Yeah Exactly",
    //             user_pic_url: "facebook.com"
    //         }

    //     ]
    // });