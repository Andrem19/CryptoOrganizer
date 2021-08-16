const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const positionSchema = new Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    val: {type: Number, required: true},
    amount: {type: Number, required: true},
    amount2: {type: Number, required: true},
    pl: {type: Number, required: true},
    buyPrice: {type: Number, required: true},
    step1: {type: Number, required: true},
    step2: {type: Number, required: true},
    step3: {type: Number, required: true},
    complete1: {type: Boolean, required: true},
    complete2: {type: Boolean, required: true},
    complete3: {type: Boolean, required: true},
    d1: {type: Boolean, required: true},
    d2: {type: Boolean, required: true},
    d3: {type: Boolean, required: true},
}, {
    timestamps: true,
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;