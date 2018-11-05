// implement your API here
// how to import / export code between files
// introduce how routing works

// import express from 'express' > export default someCode
const express = require('express');// Common JS modules > module.exports = someCode;
const db = require('./data/db.js');
const cors = require('cors'); // install package

// Create the server
const server = express(); // fully functional web server

// middleware. needed to connect from react
server.use(cors());
server.use(express.json());
// request handler. HEY SERVER! If you ever see a get req with '/', execute this func
// 1st arg: obj that represents the data on the req
// 2nd arg: obj that represents the data on the response
// ----then express takes some cool helpers into req and response ------
// helpers will be added to those two helpers

server.get('/', (req, res) => {
    res.send('<h1>Hello Lee!</h1>');

})

server.get('/api/users', (req,res) => {
    console.log(req.query); // read info with a query string ====== /api/users?u=lee. inside query, put key value pair of u equal to lee. seen in google search.
    // seen in sorting. /users?sort=asc or desc.
    // qualifiers = sort by date;; x y. search/filter
    // how to get data from database? callback: req handler/ route handler/ listener
    db.find().then( users => {
        // turn to json string
        console.log('\n** users **', users);
        res.json(users);
    }) 
    .catch(err => res.send(err))
    // everytime u have a promise = BROS = then and catch ; success and errpr

})

server.post('/api/users', (req, res) => {
    console.log(req.body);
    const { name, bio } = req.body;
    const newUser = { name, bio };
    db.insert(newUser)
    .then(insertedUser => {
        res.status(201) // successful create.send('User Created!', insertedUser);
    })
    .catch(err => {
        res.send(err);
    })
    
})

// Property from req object to create data = body
server.post('/api/users', (req, res) => {
    const {name, bio } = req.body; // take props off obj and take props to variables --- DESTRUCTURING THE OBJECT. THERE IS NAME, BIO FOUND IN BODY OBJ
    const newUser = { name, bio } // name will create key value pair and bio
    db.insert(newUser) // return built in obj type Promise. then and catch  = async
    .then (userId => {
        const { id } = userId;
        db.findById(id).then(user => {
            console.log(user)
            if (!user) {
                return res.status(422).send({Error: `user does not exist by that ${userId}`})
            }
            res.status(201).json(user);
        })
    })
    .catch( err => console.log(err));
})

// delete
server.delete('/api/users/:id', (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    db.remove(id)
    .then(removedUser => {
        console.log(removedUser);
        res.status(200).json(removedUser);
    })
    .catch(err => {
        res.send(err)
    })

})


server.get('/api/about', (req, res) => {
    res.status(200).send('<h1>About Us</h1>') // 200 port is success

});

server.get('/api/contact', (req, res)  => {
    res
    .status(200)
    .send('<div><h1>Contact</h1> <input placeholder="email" /></div>');

});





// Server! Watch for traffic in a particular port. Port: 
const port = 7000;
server.listen(port, () => console.log(`API running on port ${port}`))
// localhost:3000 // 3000 is the port.
// Public IP. Pc is building. To get there, need address. Looking for Hernandez family. Which door?
// Apt bldg is the port. PC diff apps in diff ports. 

// Port 80: Standard http traffic
// Port 443: https - protected by layered encryption
// Port 25: Email servers

// Access through the network. Go to this door or port if you want to see it.

// Nodemon: monitor 

// npm run server or yarn server or yarn start



// DAY 2