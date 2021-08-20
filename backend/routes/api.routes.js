const router = require('express').Router();
let ApiKeys = require('../models/apiKeys.model');

//apikeys/
router.route('/').get((req, res) => {
    ApiKeys.find()
    .then(position => res.json(position))
    .catch(err => res.status(400).json('Error: ' + err))
})
//apikeys/add
router.route('/add').post((req, res) => {
    const userId = String(req.body.userId);
    const apiKey = req.body.apiKey;
    const apiSecret = req.body.apiSecret;

    const newApiKeys = new ApiKeys({
        userId,
        apiKey,
        apiSecret
       
    });

    newApiKeys.save()
    .then(() => res.json('New api added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    ApiKeys.findById(req.params.id)
    .then(apikey => res.json(apikey))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    ApiKeys.findByIdAndDelete(req.params.id)
    .then(position => res.json("Api deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    ApiKeys.findById(req.params.id)
    .then(apikeys => {
    apikeys.userId = req.body.userId;
    apikeys.apiKey = req.body.apiKey;
    apikeys.apiSecret = String(req.body.apiSecret);   
   
    apikeys.save()
        .then(() => res.json('Api updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;