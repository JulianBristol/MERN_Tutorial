const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    daysSinceConsumed: {
        type: Number,
        required: true,
    },
});

const Food = mongoose.model('FoodData', FoodSchema);
module.exports = Food;