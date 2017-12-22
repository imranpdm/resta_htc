var mongoose = require('mongoose'),
    // Schema = mongoose.Schema;
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

// var restaurantModel = new Schema({
//     title: {
//         type: String
//     },
//     author: {type: String},
//     genre: {type: String},
//     read: {type: Boolean, default:false}
// });

// var restaurantModel = new Schema({
//     itemname: {
//         type: String
//     },
//     itemprice: {type: String},
//     itemimg: {type: String},
//     description: {type: String},
//     restaurant: {type: String}
    
    
//     // description: {type: Boolean, default:false}
// });

var restaurantModel = new Schema({
    item_name: {
        type: String
    },
    item_cost: {type: String},
    item_image_name: {type: String},
    item_description: {type: String},
    restaurant: {type: String}
    
    
    // description: {type: Boolean, default:false}
});

restaurantModel.plugin(autoIncrement.plugin, {
    model: 'Book',
    field: 'item_id',
    startAt: 1,
    incrementBy: 1
});


// restaurantModel.plugin(autoIncrement.plugin, 'Book');
// var Book = connection.model('Book', bookSchema);


module.exports= mongoose.model('Book', restaurantModel);