const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config('./.env');

const FoodModel = require("./models/Food");

exports.handler = async function(event, context) {
  app.use(express.json());
  app.use(cors());

  mongoose.connect(`mongodb+srv://${process.env.MongoDB_UserName}:${process.env.MongoDB_Password}@shoppinglistapp.aikcfcl.mongodb.net/shoppingList`, 
  {
    useNewUrlParser: true,
  });
  console.log(process.env.MongoDB_UserName)
  console.log(process.env.MongoDB_Password)

  //Create
  if (event.httpMethod === 'POST') {
    try {
      const requestBody = JSON.parse(event.body);
      const foodName = requestBody.foodName;
      const days = requestBody.days;
      const food = new FoodModel({ foodName: foodName, daysSinceConsumed: days });
  
      try {
        await food.save();
        return {
          statusCode: 200,
          body: JSON.stringify({success: `Inserted ${food}`}),
        };
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error Creating Document' }),
      };
    }
  }

  //Read
  if (event.httpMethod === 'GET') {
    try {
      const foods = await FoodModel.find({}).exec();
      const responseData = foods.map((food) => ({
        id: food._id,
        foodName: food.foodName,
        daysSinceConsumed: food.daysSinceConsumed,
      }));
    
      return {
        statusCode: 200,
        body: JSON.stringify(responseData),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error retrieving documents' }),
      };
    }
  }

  //Update
  if (event.httpMethod === 'PUT') {
    try {
      const requestBody = JSON.parse(event.body);
      const id = requestBody.id;
      const newFoodName = requestBody.newFoodName;
      const newDays = requestBody.newDays;

      try {
        const updatedFood = await FoodModel.findById(id);
        console.log(updatedFood)
        updatedFood.foodName = newFoodName;
        updatedFood.daysSinceConsumed = newDays;
        console.log(updatedFood)
        await updatedFood.save();
        return {
          statusCode: 200,
          body: JSON.stringify({success: `Updated ID: ${id}`}),
        };
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error Updating document' }),
      };
    }
  }

  //Delete
  if (event.httpMethod === 'DELETE') {
    try {
      const requestBody = JSON.parse(event.body);
      const id = requestBody.id;

      try {
        await FoodModel.findByIdAndRemove(id).exec();
        return {
          statusCode: 200,
          body: JSON.stringify({success: `Deleted ID: ${id}`}),
        };
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error Deleting document' }),
      };
    }
  }

}