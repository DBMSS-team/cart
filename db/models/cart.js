const mongoose = require("mongoose");
const { Decimal128 } = require("bson");

let productSchema = mongoose.Schema({});
let cartSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  products: [{ type: String }],
  store_id: { type: String },
  user_id: { type: String },
  quantity: { type: Number },
  total_cost: { type: Decimal128 },
});

// export model user with UserSchema
module.exports = mongoose.model("cart", cartSchema);
