const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config('./.env');

const FoodModel = require("./models/Food");

app.use(express.json()); //parses the data from the frontend into a JSON object
app.use(cors()); //allows the database to read the data from the frontend (I think)

/* This line says to connect to the database called food_crud (create that database if it doesn't exist)  */
mongoose.connect("",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({ foodName: foodName, daysSinceConsumed: days });

  try {
    await food.save();
    res.send("Inserted Data: " + food);
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  /* use the line below to find all elements in the database */
  FoodModel.find({}, (err, result) =>{
    if (err) {
        res.send(err);
    }
    res.send(result);
  });
  /* use FoodModel.find({ $where: { foodName: "apple" } }, ) to find all elements where foodName = apple*/
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
   await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.daysSinceConsumed = newDays;
      updatedFood.save();
      res.send("update");
    })
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
