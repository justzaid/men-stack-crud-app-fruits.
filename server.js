// Dependencies
const dotenv = require("dotenv")
dotenv.config();
const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require('morgan');

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Model import
const Fruit = require('./models/fruit');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


// Public routes

// index page
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });


// fruits page
app.get("/fruits", async (req, res) => {
const allFruits = await Fruit.find({});
// console.log(allFruits); // log the fruits!
res.render("fruits/index.ejs", { fruits: allFruits });
});


// Create Fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
})

// Post Fruit
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
  });

  // Show Fruit
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  res.render('fruits/show.ejs', {fruit : foundFruit});
});


// Delete Fruit
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});



// listener
app.listen(3100, () => {
  console.log("Listening on port 3000");
});
