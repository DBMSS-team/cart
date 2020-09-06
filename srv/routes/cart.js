const router = require("express").Router();
let Cart = require("../../db/models/cart.model");

// Get all carts
router.route("/").get((req, res) => {
	Cart.find()
		.then((cart) => res.json(cart))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Get specific cart
router.route("/:id").get((req, res) => {
	const id = req.params.id;
	Cart.findById(id, (err, cart) => {
		if (err) res.status(400).json("Error: " + err);
		res.json(cart);
	});
});

// Create new cart
router.route("/").post((req, res) => {
	const newCart = new Cart(req.body);
	newCart
		.save()
		.then(() => res.json("Cart added."))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Update a specific cart
router.route("/:id").put(async (req, res) => {
	const id = req.params.id;
	try {
		let updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
			"new": true,
			useFindAndModify: false,
		});
		res.json(updatedCart);
	} catch (err) {
		res.status(400).json("Error: " + err);
	}
});

// Delete cart
router.route("/:id").delete(async (req, res) => {
	const id = req.params.id;
	try {
		const deletedCart = await Cart.findByIdAndDelete(id);
		res.json(deletedCart);
	} catch (err) {
		res.status(400).json("Error: " + err);
	}
});

module.exports = router;
