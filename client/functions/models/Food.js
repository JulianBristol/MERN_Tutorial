const mongoose = require('mongoose');

/* Creates the schema to be placed into the collection */
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
/* The line below creates a mongoDB collection called foods (notice the 's' at the end) and places the FoodSchema data within it */
/* If the data within the FoodSchema already exists, this line will continue to keep adding to the foods collection */
const Food = mongoose.model("food", FoodSchema);
module.exports = Food;