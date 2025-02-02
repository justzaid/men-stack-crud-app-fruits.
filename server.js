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

// Import controller functions
const fruitCtrl = require('./controllers/fruits')

// Public routes

app.get('/', fruitCtrl.index);

app.get('/fruits', fruitCtrl.home);

app.get('/fruits/new', fruitCtrl.newFruits);

app.post('/fruits', fruitCtrl.postFruit);

app.get('/fruits/:fruitId', fruitCtrl.showFruit);

app.get('/fruits/:fruitId/edit', fruitCtrl.editFruit);

app.put('/fruits/:fruitId', fruitCtrl.updateFruit);

app.delete('/fruits/:fruitId', fruitCtrl.deleteFruit);

// index page
// app.get("/", async (req, res) => {
//     res.render("index.ejs");
//   });

// fruits page
// app.get("/fruits", async (req, res) => {
// const allFruits = await Fruit.find({});
// // console.log(allFruits); // log the fruits!
// res.render("fruits/index.ejs", { fruits: allFruits });
// });

// Create Fruit
// app.get('/fruits/new', (req, res) => {
//     res.render('fruits/new.ejs');
// })

// Post Fruit
// app.post("/fruits", async (req, res) => {
//     if (req.body.isReadyToEat === "on") {
//       req.body.isReadyToEat = true;
//     } else {
//       req.body.isReadyToEat = false;
//     }
//     await Fruit.create(req.body);
//     res.redirect("/fruits");
// });

// Show Fruit
// app.get("/fruits/:fruitId", async (req, res) => {
//   const foundFruit = await Fruit.findById(req.params.fruitId)
//   res.render('fruits/show.ejs', {fruit : foundFruit});
// });


// Delete Fruit
// app.delete("/fruits/:fruitId", async (req, res) => {
//   await Fruit.findByIdAndDelete(req.params.fruitId);
//   res.redirect("/fruits");
// });

// Edit Fruit
// app.get("/fruits/:fruitId/edit", async (req, res) => {
//   const foundFruit = await Fruit.findById(req.params.fruitId);
//   res.render("fruits/edit.ejs", {
//     fruit: foundFruit,
//   });
// });

// Update Fruit
// app.put("/fruits/:fruitId", async (req, res) => {
//   // Handle the 'isReadyToEat' checkbox data
//   if (req.body.isReadyToEat === "on") {
//     req.body.isReadyToEat = true;
//   } else {
//     req.body.isReadyToEat = false;
//   }
  
//   // Update the fruit in the database
//   await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

//   // Redirect to the fruit's show page to see the updates
//   res.redirect(`/fruits/${req.params.fruitId}`);
// });

// listener
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
