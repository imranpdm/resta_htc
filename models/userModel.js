var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var cartSchema = new Schema({
        item_name : {type: String},
        cost : {type: String},
        ischecked: { type: Boolean, default: false },
        createdAt: {
            type: Date, 
            default: Date.now
            },
    
        });


var userModel = new Schema({
    username: {
        type: String
    },
    source: {type: String},
    destination: {type: String},
    cart: [cartSchema],
    total: {type: String}
    
    
    // description: {type: Boolean, default:false}
});



module.exports= mongoose.model('Book', userModel);