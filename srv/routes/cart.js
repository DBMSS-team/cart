const router = require("express").Router();
let Cart = require("../../db/models/cart.model");

const { messages, httpCodes } = require(__commons);
const ResponseUtils = new (require(__commons).ResponseUtils)();

// Get all carts
router.route("/").get((req, res) => {
	Cart.find()
		.then((cart) => {
			ResponseUtils.setSuccess(httpCodes.OK, messages.CART_FOUND, cart).send(
				res
			);
		})
		.catch((err) =>
			ResponseUtils.setError(httpCodes.DB_ERROR, err.message).send(res)
		);
});

// Get specific cart
router.route("/:id").get((req, res) => {
	const id = req.params.id;
	Cart.findById(id, (err, cart) => {
		if (err) ResponseUtils.setError(httpCodes.DB_ERROR, err.message).send(res);
		res.json(cart);
	});
});

// Create new cart
router.route("/").post((req, res) => {
	const newCart = new Cart(req.body);
	newCart
		.save()
		.then((cart) => {
			ResponseUtils.setSuccess(
				httpCodes.CREATED,
				messages.CART_CREATED,
				cart
			).send(res);
		})
		.catch((err) => {
			ResponseUtils.setError(httpCodes.DB_ERROR, err.message).send(res);
		});
});

// Update a specific cart
router.route("/:id").put(async (req, res) => {
	const id = req.params.id;
	try {
		let updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
			new: true,
			useFindAndModify: false,
		});
		ResponseUtils.setSuccess(
			httpCodes.OK,
			messages.CART_FOUND,
			updatedCart
		).send(res);
	} catch (err) {
		ResponseUtils.setError(httpCodes.INTERNAL_SERVER_ERROR, err.message).send(
			res
		);
	}
});

// Delete cart
router.route("/:id").delete(async (req, res) => {
	const id = req.params.id;
	try {
		const deletedCart = await Cart.findByIdAndDelete(id);
		ResponseUtils.setSuccess(
			httpCodes.OK,
			messages.CART_DELETED,
			deletedCart
		).send(res);
	} catch (err) {
		ResponseUtils.setError(httpCodes.INTERNAL_SERVER_ERROR, err.message).send(
			res
		);
	}
});

module.exports = router;
