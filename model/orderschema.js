var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    order_id: Number,
    email: String,
    phone: Number,
    first_name: String,
    last_name: String,
    address1: {type:String,default:""},
    address2: {type:String,default:""},
    city: String,
    province: String,
    country: String,
    zip: String
})

mongoose.model("Order", UserSchema);

module.exports = mongoose.model("Order");