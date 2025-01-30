
require('dotenv').config();
require('./config/database');
const express = require('express');
const morgan = require('morgan')

const app = express();

// MODELS

const Fruit = require('./models/fruit');

// MIDDLEWARE

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))

// PUBLIC ROUTES

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.get("/fruits", async (req, res) => {
const allFruits = await Fruit.find();
console.log(allFruits); // log the fruits!
res.send("Welcome to the index page!");
});

app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
  });


// Create Fruit

app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
})

app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
  });


// LISTENER

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


