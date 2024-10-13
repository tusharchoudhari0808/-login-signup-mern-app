const ensureAuthenticated = require('../midlleweres/Auth');
const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    // Log the details of the logged-in user
  

    // Respond with a JSON array of products
    res.status(200).json([
        {
            name: "Mobile",
            price: 10000,
        },
        {
            name: "TV",
            price: 120000,
        }
    ])
});

module.exports = router;
