const mongoose = require('mongoose');
 
const imageSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    articleImage: { type: String, required: true }
});
 
//Image is a model which has a schema imageSchema
 
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;