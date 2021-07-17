const mongoose = require('mongoose');

module.exports.Initialize_Mongo_DB = () => {

    const USER = process.env.USER || "twicer";
    const DB_NAME = process.env.DB_NAME || "Be-In-One";
    const PASS = process.env.PASS || "saad_d14";

    const CONNECTION_URL = `mongodb+srv://${USER}:${PASS}@cluster0.o5zwa.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        
        // const RoomsCollection = require('../models/ChatRoom');

        // const query = {
        //     'room_users': {
        //         $elemMatch: {_id: 'SQBfWjDxTyROBLhkMkOYNQopm2A3'}
        //     }
        // }

        // RoomsCollection.find(query, (err, res) => {
        //     if (err)
        //         console.log(err)
        //     else
        //         console.log(res)
        // })
    })

    mongoose.connection.on('connected', () => {
        console.log('DB Connected')
    })
    mongoose.connection.on('reconnected', () => {
        console.log('DB Reconnected')
    })
    mongoose.connection.on('error', error => {
        console.log('DB Connection Error', error)
        mongoose.disconnect()
    })
    mongoose.connection.on('disconnected', () => {
        console.log('DB Disconnected')
    })

}

// mongoose.connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(db =>{

//     db.connection.collection('users').aggregate([
//       { $lookup:
//         {
//           from: 'chatrooms',
//           localField: '_id',
//           foreignField: '_id',
//           as: 'orderdetails'
//         }
//       },{ $match : { "orderdetails" : { $ne : []}}}
//     ])
//     .toArray(function(err, res) {
//         if (err) throw err;
//         console.log( res);
//       });
// })