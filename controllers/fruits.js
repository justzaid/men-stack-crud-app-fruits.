const Fruit = require('./../models/fruit')

const index = async (req, res) => {
    res.render('index.ejs');
  }

const home = async (req, res) => {
    const fruits = await Fruit.find({});
    res.render('fruits/index.ejs', { fruits: fruits });
}

const newFruits = (req, res) => {
    res.render('fruits/new.ejs')
}

const postFruit = async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect('fruits')
}

const showFruit = async (req, res) => {
      const foundFruit = await Fruit.findById(req.params.fruitId)
      res.render('fruits/show.ejs', {fruit : foundFruit});
};

const deleteFruit = async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
};

const editFruit = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
    fruit: foundFruit,
    });
};

const updateFruit = async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
    res.redirect(`/fruits/${req.params.fruitId}`);
  };

  module.exports = {
    index,
    home,
    newFruits,
    postFruit,
    showFruit,
    deleteFruit,
    editFruit,
    updateFruit,
  }