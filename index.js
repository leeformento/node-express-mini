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
// request handler. HEY SERVER! If you ever see a get req with '/', execute this func
// 1st arg: obj that represents the data on the req
// 2nd arg: obj that represents the data on the response
// ----then express takes some cool helpers into req and response ------
// helpers will be added to those two helpers

server.get('/', (req, res) => {
    res.send('<h1>Hello Lee!</h1>');

})

server.get('/api/users', (req,res) => {
    // how to get data from database? callback: req handler/ route handler/ listener
    db.find().then( users => {
        // turn to json string
        console.log('\n** users **', users);
        res.json(users);
    }) 
    .catch(err => res.send(err))
    // everytime u have a promise = BROS = then and catch ; success and errpr

})



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