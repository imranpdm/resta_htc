var mongoose = require('mongoose'),
    // Schema = mongoose.Schema;
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
    

    var itemsSchema = new Schema({
        item_name : {type: String},
        item_cost : {type: String}
        });

var orderModel = new Schema({
    items: {type: String},
    total_cost: {type: String},
    source: {type: String},
    destination: {type: String},
    createdAt: {
        type: Date, 
        default: Date.now
        }
    // description: {type: Boolean, default:false}
});

orderModel.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'order_id',
    startAt: 1,
    incrementBy: 1
});


// restaurantModel.plugin(autoIncrement.plugin, 'Book');
// var Book = connection.model('Book', bookSchema);


module.exports= mongoose.model('Order', orderModel);