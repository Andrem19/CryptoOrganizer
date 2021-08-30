const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    const mat = [1, 1, 1,]
console.log("Hello Server: ", mat)
});

module.exports = router;