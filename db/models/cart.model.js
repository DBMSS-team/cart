const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartProductSchema = new Schema({
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema({
  products: [cartProductSchema],
  store_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  total_cost: { type: mongoose.Types.Decimal128, required: true },
});

const Cart = mongoose.model("Cart", cartSchema);

// export model user with UserSchema
module.exports = Cart;
