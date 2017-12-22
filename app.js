var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    autoIncrement = require('mongoose-auto-increment');


var db = mongoose.connect('mongodb://localhost/stapi');

autoIncrement.initialize(db);

var Book = require('./models/bookModel');

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    
    next();
  });
  
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);
// orderRouter = require('./Routes/orderRoutes')(Order);
var api = require('./Routes/orderRoutes');





app.use('/api/books', bookRouter); 
app.use('/api', api);

app.use(express.static('uploads'));

app.get('/', function(req, res){
    res.send('welcome to my API!');
});


app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});