const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const userController = require("../controllers/userController");
const User = require('../models/user')

router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));
router.route('/').get((req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;