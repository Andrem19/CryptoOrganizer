const router = require('express').Router();
let Position = require('../models/position.model');

router.route('/').get((req, res) => {
    Position.find()
    .then(position => res.json(position))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const userId = String(req.body.userId);
    const val = Number(req.body.val);
    const amount = Number(req.body.amount);
    const amount2 = Number(req.body.amount2);
    const pl = Number(req.body.pl);
    const buyPrice = Number(req.body.buyPrice);
    const step1 = Number(req.body.step1);
    const step2 = Number(req.body.step2);
    const step3 = Number(req.body.step3);
    const complete1 = Boolean(req.body.complete1);
    const complete2 = Boolean(req.body.complete2);
    const complete3 = Boolean(req.body.complete3);
    const d1 = Boolean(req.body.d1);
    const d2 = Boolean(req.body.d2);
    const d3 = Boolean(req.body.d3);

    const newPosition = new Position({
        id,
        name,
        userId,
        val,
        amount,
        amount2,
        pl,
        buyPrice,
        step1,
        step2,
        step3,
        complete1,
        complete2,
        complete3,
        d1,
        d2,
        d3
    });

    newPosition.save()
    .then(() => res.json('Position added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    Position.findById(req.params.id)
    .then(position => res.json(position))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Position.findByIdAndDelete(req.params.id)
    .then(position => res.json("Position deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Position.findById(req.params.id)
    .then(position => {
    position.id = req.body.id;
    position.name = req.body.name;
    position.UserId = String(req.body.UserId);   
    position.val = Number(req.body.val);
    position.amount = Number(req.body.amount);
    position.amount2 = Number(req.body.amount2);
    position.pl = Number(req.body.pl);
    position.buyPrice = Number(req.body.buyPrice);
    position.step1 = Number(req.body.step1);
    position.step2 = Number(req.body.step2);
    position.step3 = Number(req.body.step3);
    position.complete1 = Boolean(req.body.complete1);
    position.complete2 = Boolean(req.body.complete2);
    position.complete3 = Boolean(req.body.complete3);
    position.d1 = Boolean(req.body.d1);
    position.d2 = Boolean(req.body.d2);
    position.d3 = Boolean(req.body.d3);

        position.save()
        .then(() => res.json('Position updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;