// var mongoose = require('mongoose');

var express = require('express');
var router = express.Router();
var Order = require('../models/orderModel');

router.post('/order', function(req, res) {
    console.log(req.body)
    
  
      var newUser = new Order({
        items: req.body.items,
        total_cost: req.body.total_cost,
        source: req.body.source,
        destination: req.body.destination,
        

      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          console.log(err);
          return res.json({success: false, msg: 'MobileNo already exists.'});
        }
        // res.json({success: true, msg: 'Successful created new user.'});
        res.status(201).send(newUser);
      });
  });


module.exports = router;
