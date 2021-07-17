const express = require('express');
const router = express.Router();

const UsersCollection = require('../models/users');
const RoomsCollection = require('../models/ChatRoom');

router.use(express.json());

router.get('/', (req, res) => {
    res.send('USER ROUTE GET REQUEST')
})

router.get('/:userid', (req, res) => {
    console.log(req.params);
    res.send('USER ROUTE GET PARAM REQUEST')
})

router.get('/rooms/:userid', (req, res) => {
   
    console.log('GET USER ROOMS ROUTE');
    console.log(req.params);
    
    const { userid } = req.params;

    const query = {
        'room_users': {
            $elemMatch: {_id: userid}
        }
    }

    RoomsCollection.find(query, (err, result) => {
        if (err){
            console.log(err)
            res.status(404).send('Unexpected Error')
        }
        else{
            //console.log(res)
            res.status(200).send(result)
        }
    })

    //res.send('USER ROOMS GET PARAM REQUEST')
})

router.post('/', (req, res) => {

    const { uid, displayName, email } = req.body;
    console.log({ uid, displayName, email })
    UsersCollection.find({ uid: uid}, (err, users) => {
       
        console.log(users.length)
     
        if(users.length < 1){
          
            var NewUser = UsersCollection({
                _id: uid,
                user_name: displayName,
                email: email,
                joined_rooms: [],
            });
           
            NewUser.save((err, user) => {
                if (err) {
                    console.log(err)
                    res.status(200).send({'CODE': 'USER_NOT_CREATED'})
                    console.log("New User Not Added! ")
                }
        
                else {
                    res.status(200).send({'CODE': 'USER_CREATED'})
                    console.log("New User Added! ", NewUser)
                }
            });

        } else {
            res.status(200).send({'CODE': 'USER_ALREADY_EXIST'})
            console.log("User Already Exist!")
        }

    })

  

})

module.exports = router;