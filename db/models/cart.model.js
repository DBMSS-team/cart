const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartProductSchema = new Schema({
	productId: { type: String, required: true },
	quantity: { type: Number, required: true },
	productCost: { type: mongoose.Types.Decimal128, required: true },
});

const cartSchema = new Schema({
	products: [cartProductSchema],
	storeId: { type: String, required: true },
	totalCost: { type: mongoose.Types.Decimal128, required: true },
});

const Cart = mongoose.model("Cart", cartSchema);

// export model user with UserSchema
module.exports = Cart;
