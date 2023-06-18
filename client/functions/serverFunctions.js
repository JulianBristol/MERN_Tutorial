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
        body: JSON.stringify({ error: 'Error retrieving data' }),
      };
    }
  }
  
  if (event.httpMethod === 'POST') {
    /* try {
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
        body: JSON.stringify({ error: 'Error retrieving data' }),
      };
    } */
  }
}