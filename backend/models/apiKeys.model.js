const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apiSchema = new Schema({
    userId: {type: String, required: true},
    apiKey: {type: String, required: true},
    apiSecret: {type: String, required: true}
}, {
    timestamps: true,
});

const ApiKeys = mongoose.model('ApiKeys', apiSchema);

module.exports = ApiKeys;