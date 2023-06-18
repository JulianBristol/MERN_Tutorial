const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config('./.env');

const FoodModel = require("./models/Food");

app.use(express.json()); //parses the data from the frontend into a JSON object
app.use(cors()); //allows the database to read the data from the frontend (I think)

/* This line says to connect to the database called food_crud (create that database if it doesn't exist)  */
mongoose.connect(`mongodb+srv://${process.env.MongoDB_UserName}:${process.env.MongoDB_Password}@shoppinglistapp.aikcfcl.mongodb.net/shoppingList`,
  {
    useNewUrlParser: true,
  }
);

/* Database Create/Write */
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

/* Database Read */
app.get("/read", async (req, res) => {
  /* use the line below to find all elements in the database */
  FoodModel.find({}, (err, result) =>{
    if (err) {
        res.send(err);
    }
    res.send(result);
  });
  
});

/* Database Update */
app.put("/update", async (req, res) => {
  const id = req.body.id;
  const newFoodName = req.body.newFoodName;
  const newDays = req.body.days;

  try {
    const updatedFood = await FoodModel.findById(id);
    updatedFood.foodName = newFoodName;
    updatedFood.daysSinceConsumed = newDays;
    await updatedFood.save();
    res.send("update");
  } catch (err) {
    console.log(err);
  }
});

/* Database Delete */
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
