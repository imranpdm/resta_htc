var express = require('express');
var fs = require('fs');
var multer = require('multer');

var upload = multer({ dest: '../uploads/', inMemory: true, includeEmptyFields: true});



var routes = function(Book){
    var bookRouter = express.Router();



    bookRouter.route('/')
        .post(upload.any(), function(req, res){

            if(req.files){
                req.files.forEach(function(file){
                   // console.log(file);
                   var filename = (new Date).valueOf()+"-"+file.originalname
                   fs.rename(file.path,'uploads/'+filename,function(err){
                     if(err)throw err;
                      console.log(filename);
                   //  save to mongoose
                     var book = new Book({
                        item_name: req.body.item_name,            
                        item_cost: req.body.item_cost,
                        item_description: req.body.item_description,
                        restaurant: req.body.restaurant,
                        item_image_name: filename
                     });
                     book.save(function(err) {
                 if (err) {
                   return res.json({success: false, msg: 'Save Restaurant failed.'});
                 }
                 res.json({success: true, msg: 'Successful created new Menu Item.'});
               });
                  });
                });
              }
            // var book = new Book(req.body);
            // book.save();
            // res.status(201).send(book);

        })
        .get(function(req,res){

            var query = {};
            
        if(req.query.restaurant)
        {
            query.restaurant = req.query.restaurant;
        }
            Book.find(query, function(err,books){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });

    bookRouter.use('/:bookId', function(req,res,next){
        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err);
            else if(book)
            {
                req.book = book;
                next();
            }
            else
            {
                res.status(404).send('no book found');
            }
        });
    });
    bookRouter.route('/:bookId')
        .get(function(req,res){

            res.json(req.book);

        })
        .put(function(req,res){
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.book[p] = req.body[p];
            }

            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        })
        .delete(function(req,res){
            req.book.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return bookRouter;
};

module.exports = routes;