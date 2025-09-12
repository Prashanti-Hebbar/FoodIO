const parser = require('../middlewares/upload');

router.post('/add', parser.single('image'), async (req, res) => {
  try {
    const newRecipe = new Recipe({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      image: req.file ? req.file.path : 'default-image.jpg',
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
