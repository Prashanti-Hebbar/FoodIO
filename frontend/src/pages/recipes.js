const recipes = {
  topRated: [
    {
      id: 1,
      title: "Delicious Pasta",
      image: "../pasta.jpg",
      rating: 4.8,
      description:
        "Creamy and flavorful pasta with a rich tomato sauce, garlic, and Parmesan cheese.",
      prepTime: "15 minutes",
      cookTime: "20 minutes",
      servings: 4,
      cuisine: "Italian",
      category: "Main Course",
      ingredients: [
        { name: "Pasta (penne or spaghetti)", quantity: "12 ounces" },
        { name: "Olive oil", quantity: "2 tablespoons" },
        { name: "Garlic", quantity: "3 cloves", notes: "minced" },
        { name: "Onion", quantity: "1 small", notes: "chopped" },
        { name: "Tomato sauce", quantity: "2 cups" },
        { name: "Heavy cream", quantity: "1/2 cup" },
        { name: "Parmesan cheese", quantity: "1/2 cup", notes: "grated" },
        { name: "Basil", quantity: "1/4 cup", notes: "chopped" },
        { name: "Salt", quantity: "to taste" },
        { name: "Black pepper", quantity: "to taste" },
        {
          name: "Red pepper flakes",
          quantity: "1/2 teaspoon",
          notes: "optional",
        },
      ],
      instructions: [
        "Bring a large pot of salted water to a boil and cook the pasta according to package instructions. Drain and set aside.",
        "Heat olive oil in a pan over medium heat and sauté onions until soft. Add garlic and cook for 1 minute.",
        "Pour in the tomato sauce and let it simmer for 5 minutes.",
        "Stir in heavy cream, Parmesan cheese, salt, and pepper. Simmer for another 3-5 minutes until the sauce thickens.",
        "Add the cooked pasta to the sauce and toss well to coat.",
        "Garnish with fresh basil and additional Parmesan cheese.",
        "Serve hot and enjoy!",
      ],
      nutritionalInfo: {
        calories: "520",
        fat: "22g",
        protein: "18g",
        carbs: "65g",
      },
      dietaryInfo: ["Vegetarian"],
    },
    {
      id: 2,
      title: "Spicy Tacos",
      image: "../tacos.jpg",
      rating: 4.7,
      description:
        "Flavorful and spicy tacos with seasoned ground beef, fresh toppings, and a zesty kick.",
      prepTime: "20 minutes",
      cookTime: "15 minutes",
      servings: 4,
      cuisine: "Mexican",
      category: "Main Course",
      ingredients: [
        { name: "Ground beef", quantity: "1 pound" },
        { name: "Taco seasoning", quantity: "2 tablespoons" },
        { name: "Onion", quantity: "1 small", notes: "chopped" },
        { name: "Garlic", quantity: "2 cloves", notes: "minced" },
        { name: "Tomatoes", quantity: "1 cup", notes: "diced" },
        { name: "Jalapeño", quantity: "1", notes: "sliced" },
        { name: "Tortillas", quantity: "8 small" },
        { name: "Cheddar cheese", quantity: "1 cup", notes: "shredded" },
        { name: "Lettuce", quantity: "1 cup", notes: "shredded" },
        { name: "Sour cream", quantity: "1/2 cup" },
        { name: "Lime wedges", quantity: "for serving" },
      ],
      instructions: [
        "Heat a skillet over medium heat and cook the chopped onion until soft.",
        "Add the garlic and ground beef, cooking until the meat is browned.",
        "Stir in taco seasoning and diced tomatoes. Simmer for 5 minutes.",
        "Warm the tortillas in a dry pan or microwave.",
        "Assemble tacos with seasoned beef, lettuce, cheese, jalapeños, and sour cream.",
        "Serve with lime wedges on the side.",
      ],
      nutritionalInfo: {
        calories: "450",
        fat: "22g",
        protein: "30g",
        carbs: "40g",
      },
      dietaryInfo: ["Spicy", "Non-Vegetarian"],
    },
    {
      id: 3,
      title: "Pumpkin Cupcakes",
      image: "../cakes.jpg",
      rating: 4.8,
      description:
        "Soft and moist pumpkin cupcakes topped with a rich cream cheese frosting.",
      prepTime: "15 minutes",
      cookTime: "20 minutes",
      servings: 12,
      cuisine: "American",
      category: "Dessert",
      ingredients: [
        { name: "All-purpose flour", quantity: "1 3/4 cups" },
        { name: "Pumpkin puree", quantity: "1 cup" },
        { name: "Granulated sugar", quantity: "3/4 cup" },
        { name: "Brown sugar", quantity: "1/2 cup" },
        { name: "Vegetable oil", quantity: "1/2 cup" },
        { name: "Eggs", quantity: "2" },
        { name: "Baking powder", quantity: "1 teaspoon" },
        { name: "Baking soda", quantity: "1/2 teaspoon" },
        { name: "Ground cinnamon", quantity: "1 teaspoon" },
        { name: "Ground nutmeg", quantity: "1/2 teaspoon" },
        { name: "Salt", quantity: "1/4 teaspoon" },
        { name: "Vanilla extract", quantity: "1 teaspoon" },
        {
          name: "Cream cheese",
          quantity: "8 ounces",
          notes: "softened (for frosting)",
        },
        {
          name: "Butter",
          quantity: "1/2 cup",
          notes: "softened (for frosting)",
        },
        { name: "Powdered sugar", quantity: "2 cups", notes: "(for frosting)" },
      ],
      instructions: [
        "Preheat oven to 350°F (175°C) and line a cupcake tin with liners.",
        "In a bowl, whisk together flour, baking powder, baking soda, cinnamon, nutmeg, and salt.",
        "In another bowl, beat eggs, sugars, oil, pumpkin puree, and vanilla until smooth.",
        "Gradually mix in dry ingredients until just combined.",
        "Divide the batter evenly into cupcake liners, filling each about 2/3 full.",
        "Bake for 18-20 minutes or until a toothpick inserted comes out clean.",
        "Let cupcakes cool completely before frosting.",
        "For frosting, beat cream cheese and butter until smooth, then mix in powdered sugar until fluffy.",
        "Frost cupcakes and enjoy!",
      ],
      nutritionalInfo: {
        calories: "320",
        fat: "15g",
        protein: "4g",
        carbs: "42g",
      },
      dietaryInfo: ["Vegetarian"],
    },
    {
      id: 4,
      title: "Apple Pie",
      image: "../pie.jpg",
      rating: 4.9,
      description:
        "A classic American apple pie with a flaky crust and a spiced apple filling.",
      prepTime: "30 minutes",
      cookTime: "50 minutes",
      servings: 8,
      cuisine: "American",
      category: "Dessert",
      ingredients: [
        {
          name: "Apples",
          quantity: "6 cups",
          notes: "peeled, cored, and sliced",
        },
        { name: "Granulated sugar", quantity: "3/4 cup" },
        { name: "Brown sugar", quantity: "1/4 cup" },
        { name: "All-purpose flour", quantity: "1/4 cup" },
        { name: "Ground cinnamon", quantity: "1 teaspoon" },
        { name: "Ground nutmeg", quantity: "1/4 teaspoon" },
        { name: "Salt", quantity: "1/4 teaspoon" },
        { name: "Lemon juice", quantity: "1 tablespoon" },
        {
          name: "Unsalted butter",
          quantity: "2 tablespoons",
          notes: "cut into small pieces",
        },
        { name: "Pie crust", quantity: "2", notes: "homemade or store-bought" },
        { name: "Egg", quantity: "1", notes: "beaten (for egg wash)" },
      ],
      instructions: [
        "Preheat oven to 375°F (190°C).",
        "In a large bowl, mix apples with sugar, flour, cinnamon, nutmeg, salt, and lemon juice.",
        "Roll out one pie crust and place it in a 9-inch pie dish.",
        "Fill with apple mixture and dot with butter pieces.",
        "Roll out the second crust and place it over the filling. Seal and crimp the edges.",
        "Brush the top with egg wash and cut small slits to allow steam to escape.",
        "Bake for 45-50 minutes, until the crust is golden brown and the filling is bubbling.",
        "Allow the pie to cool for at least 2 hours before serving.",
      ],
      nutritionalInfo: {
        calories: "350",
        fat: "15g",
        protein: "3g",
        carbs: "50g",
      },
      dietaryInfo: ["Vegetarian"],
    },
    {
      id: 5,
      title: "Best Lasagna",
      image: "../lasagna.jpg",
      rating: 5.0,
      description:
        "A rich and cheesy Italian lasagna layered with a savory meat sauce and creamy ricotta filling.",
      prepTime: "30 minutes",
      cookTime: "1 hour",
      servings: 8,
      cuisine: "Italian",
      category: "Main Course",
      ingredients: [
        { name: "Ground beef", quantity: "1 pound" },
        {
          name: "Italian sausage",
          quantity: "1/2 pound",
          notes: "mild or spicy",
        },
        { name: "Onion", quantity: "1 medium", notes: "chopped" },
        { name: "Garlic", quantity: "3 cloves", notes: "minced" },
        { name: "Tomato sauce", quantity: "28 ounces" },
        { name: "Crushed tomatoes", quantity: "28 ounces" },
        { name: "Tomato paste", quantity: "6 ounces" },
        { name: "Water", quantity: "1/2 cup" },
        { name: "Sugar", quantity: "1 tablespoon" },
        { name: "Dried basil", quantity: "1 teaspoon" },
        { name: "Dried oregano", quantity: "1 teaspoon" },
        { name: "Salt", quantity: "to taste" },
        { name: "Black pepper", quantity: "to taste" },
        {
          name: "Lasagna noodles",
          quantity: "12",
          notes: "cooked according to package instructions",
        },
        { name: "Ricotta cheese", quantity: "15 ounces" },
        { name: "Egg", quantity: "1" },
        { name: "Parmesan cheese", quantity: "1/2 cup", notes: "grated" },
        { name: "Mozzarella cheese", quantity: "3 cups", notes: "shredded" },
        { name: "Fresh parsley", quantity: "1/4 cup", notes: "chopped" },
      ],
      instructions: [
        "In a large skillet, cook ground beef, sausage, and onion over medium heat until browned. Drain excess fat.",
        "Add garlic and cook for 1 minute. Stir in tomato sauce, crushed tomatoes, tomato paste, water, sugar, basil, oregano, salt, and pepper. Simmer for 30 minutes.",
        "In a bowl, mix ricotta cheese, egg, Parmesan cheese, and parsley.",
        "Preheat oven to 375°F (190°C).",
        "In a 9x13-inch baking dish, spread a layer of meat sauce. Add a layer of noodles, then spread a layer of ricotta mixture, followed by mozzarella cheese.",
        "Repeat layers until all ingredients are used, finishing with mozzarella on top.",
        "Cover with foil and bake for 25 minutes. Remove foil and bake for another 25 minutes until bubbly and golden brown.",
        "Let rest for 10 minutes before slicing and serving.",
      ],
      nutritionalInfo: {
        calories: "600",
        fat: "35g",
        protein: "40g",
        carbs: "50g",
      },
      dietaryInfo: ["Non-Vegetarian"],
    },
    {
      id: 6,
      title: "Harira",
      image: "../harira.jpg",
      rating: 4.8,
      description:
        "A traditional Moroccan soup made with tomatoes, lentils, chickpeas, and aromatic spices.",
      prepTime: "15 minutes",
      cookTime: "1 hour",
      servings: 6,
      cuisine: "Moroccan",
      category: "Soup",
      ingredients: [
        { name: "Olive oil", quantity: "2 tablespoons" },
        { name: "Onion", quantity: "1 large", notes: "chopped" },
        { name: "Garlic", quantity: "3 cloves", notes: "minced" },
        { name: "Celery", quantity: "2 stalks", notes: "chopped" },
        { name: "Carrot", quantity: "1", notes: "chopped" },
        { name: "Canned tomatoes", quantity: "28 ounces", notes: "crushed" },
        { name: "Tomato paste", quantity: "2 tablespoons" },
        { name: "Vegetable broth", quantity: "6 cups" },
        { name: "Lentils", quantity: "1 cup", notes: "rinsed" },
        {
          name: "Chickpeas",
          quantity: "1 can (15 ounces)",
          notes: "drained and rinsed",
        },
        { name: "Ground cumin", quantity: "1 teaspoon" },
        { name: "Ground coriander", quantity: "1 teaspoon" },
        { name: "Ground cinnamon", quantity: "1/2 teaspoon" },
        { name: "Ground turmeric", quantity: "1/2 teaspoon" },
        { name: "Salt", quantity: "to taste" },
        { name: "Black pepper", quantity: "to taste" },
        { name: "Fresh cilantro", quantity: "1/4 cup", notes: "chopped" },
        { name: "Fresh parsley", quantity: "1/4 cup", notes: "chopped" },
        { name: "Lemon juice", quantity: "1 tablespoon" },
      ],
      instructions: [
        "Heat olive oil in a large pot over medium heat. Add onions, garlic, celery, and carrot. Sauté until softened, about 5 minutes.",
        "Stir in cumin, coriander, cinnamon, turmeric, salt, and pepper. Cook for 1 minute to release the flavors.",
        "Add crushed tomatoes, tomato paste, and vegetable broth. Bring to a simmer.",
        "Add lentils and chickpeas. Cover and cook for 45 minutes, stirring occasionally, until lentils are tender.",
        "Stir in fresh cilantro, parsley, and lemon juice. Simmer for another 5 minutes.",
        "Serve hot with crusty bread or over rice.",
      ],
      nutritionalInfo: {
        calories: "300",
        fat: "7g",
        protein: "15g",
        carbs: "45g",
      },
      dietaryInfo: ["Vegan", "Gluten-Free"],
    },
  ],
  trending: [
    {
      id: 7,
      title: "Vegan Curry",
      image: "../curry.jpg",
      rating: 4.9,
      description:
        "A hearty and flavorful vegan curry packed with vegetables, coconut milk, and aromatic spices.",
      prepTime: "15 minutes",
      cookTime: "40 minutes",
      servings: 4,
      cuisine: "Indian",
      category: "Main Course",
      ingredients: [
        { name: "Olive oil", quantity: "2 tablespoons" },
        { name: "Onion", quantity: "1 large", notes: "chopped" },
        { name: "Garlic", quantity: "4 cloves", notes: "minced" },
        { name: "Ginger", quantity: "1 tablespoon", notes: "grated" },
        { name: "Carrot", quantity: "1", notes: "sliced" },
        { name: "Bell pepper", quantity: "1", notes: "chopped" },
        { name: "Sweet potato", quantity: "1 large", notes: "cubed" },
        {
          name: "Canned chickpeas",
          quantity: "1 can (15 ounces)",
          notes: "drained and rinsed",
        },
        { name: "Canned diced tomatoes", quantity: "1 can (14 ounces)" },
        { name: "Coconut milk", quantity: "1 can (14 ounces)" },
        { name: "Vegetable broth", quantity: "2 cups" },
        { name: "Ground turmeric", quantity: "1 teaspoon" },
        { name: "Ground cumin", quantity: "1 teaspoon" },
        { name: "Ground coriander", quantity: "1 teaspoon" },
        { name: "Garam masala", quantity: "1 teaspoon" },
        { name: "Salt", quantity: "to taste" },
        { name: "Black pepper", quantity: "to taste" },
        { name: "Fresh spinach", quantity: "2 cups" },
        { name: "Fresh cilantro", quantity: "1/4 cup", notes: "chopped" },
        { name: "Lime juice", quantity: "1 tablespoon" },
      ],
      instructions: [
        "Heat olive oil in a large pot over medium heat. Add onions and sauté until softened, about 5 minutes.",
        "Add garlic, ginger, and spices (turmeric, cumin, coriander, garam masala). Cook for 1 minute to release flavors.",
        "Stir in carrots, bell pepper, and sweet potato. Cook for another 3-4 minutes.",
        "Add diced tomatoes, chickpeas, coconut milk, and vegetable broth. Bring to a boil, then reduce heat and simmer for 30 minutes until vegetables are tender.",
        "Stir in fresh spinach and cook for 2 more minutes until wilted.",
        "Remove from heat, stir in fresh cilantro and lime juice.",
        "Serve hot with rice or naan.",
      ],
      nutritionalInfo: {
        calories: "350",
        fat: "15g",
        protein: "10g",
        carbs: "45g",
      },
      dietaryInfo: ["Vegan", "Gluten-Free"],
    },
    {
      id: 8,
      title: "Chocolate Cake",
      image: "../choco.jpg",
      rating: 5.0,
      description:
        "A rich and moist chocolate cake with a creamy chocolate frosting, perfect for any occasion.",
      prepTime: "20 minutes",
      cookTime: "35 minutes",
      servings: 8,
      cuisine: "Dessert",
      category: "Cake",
      ingredients: [
        { name: "All-purpose flour", quantity: "1 and 3/4 cups" },
        { name: "Granulated sugar", quantity: "2 cups" },
        { name: "Unsweetened cocoa powder", quantity: "3/4 cup" },
        { name: "Baking powder", quantity: "1 and 1/2 teaspoons" },
        { name: "Baking soda", quantity: "1 and 1/2 teaspoons" },
        { name: "Salt", quantity: "1 teaspoon" },
        { name: "Eggs", quantity: "2 large" },
        { name: "Whole milk", quantity: "1 cup" },
        { name: "Vegetable oil", quantity: "1/2 cup" },
        { name: "Vanilla extract", quantity: "2 teaspoons" },
        { name: "Boiling water", quantity: "1 cup" },
      ],
      instructions: [
        "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
        "In a large bowl, whisk together flour, sugar, cocoa powder, baking powder, baking soda, and salt.",
        "Add eggs, milk, vegetable oil, and vanilla extract. Beat on medium speed until well combined.",
        "Reduce mixer speed to low and carefully add boiling water. Mix until the batter is smooth.",
        "Divide batter evenly between the prepared cake pans.",
        "Bake for 30-35 minutes or until a toothpick inserted in the center comes out clean.",
        "Cool cakes in pans for 10 minutes, then transfer to a wire rack to cool completely before frosting.",
        "Frost with your favorite chocolate frosting and enjoy!",
      ],
      nutritionalInfo: {
        calories: "450",
        fat: "18g",
        protein: "6g",
        carbs: "65g",
      },
      dietaryInfo: ["Vegetarian"],
    },
    {
      id: 9,
      title: "Corn Fritters",
      image: "../corn.jpg",
      rating: 4.7,
      description:
        "Crispy and golden corn fritters made with fresh corn kernels, perfect as a snack or appetizer.",
      prepTime: "15 minutes",
      cookTime: "10 minutes",
      servings: 4,
      cuisine: "American",
      category: "Snack",
      ingredients: [
        { name: "Fresh corn kernels", quantity: "1 cup" },
        { name: "All-purpose flour", quantity: "1/2 cup" },
        { name: "Egg", quantity: "1 large" },
        { name: "Milk", quantity: "1/4 cup" },
        { name: "Baking powder", quantity: "1 teaspoon" },
        { name: "Salt", quantity: "1/2 teaspoon" },
        { name: "Black pepper", quantity: "1/4 teaspoon" },
        { name: "Chopped green onions", quantity: "1/4 cup" },
        { name: "Shredded cheddar cheese", quantity: "1/2 cup" },
        { name: "Vegetable oil", quantity: "for frying" },
      ],
      instructions: [
        "In a bowl, whisk together flour, baking powder, salt, and black pepper.",
        "In another bowl, beat the egg and mix in the milk.",
        "Combine the wet and dry ingredients, then fold in corn kernels, green onions, and shredded cheese.",
        "Heat vegetable oil in a pan over medium heat.",
        "Drop spoonfuls of batter into the pan and flatten slightly.",
        "Fry for 2-3 minutes on each side until golden brown and crispy.",
        "Drain on paper towels and serve warm with your favorite dipping sauce.",
      ],
      nutritionalInfo: {
        calories: "220",
        fat: "12g",
        protein: "5g",
        carbs: "22g",
      },
      dietaryInfo: ["Vegetarian"],
    },
    {
      id: 10,
      title: "Bread Cheese Lollipop",
      image: "../lollipop.jpg",
      rating: 4.6,
      description:
        "Crispy, cheesy bread lollipops with a golden crust, perfect for a fun snack or party appetizer.",
      prepTime: "20 minutes",
      cookTime: "10 minutes",
      servings: 6,
      cuisine: "Fusion",
      category: "Snack",
      ingredients: [
        { name: "Bread slices", quantity: "4 slices" },
        { name: "Mozzarella cheese", quantity: "1 cup", notes: "grated" },
        { name: "Boiled potato", quantity: "1 medium", notes: "mashed" },
        { name: "Cornflour", quantity: "2 tablespoons" },
        { name: "Black pepper", quantity: "1/2 teaspoon" },
        { name: "Salt", quantity: "to taste" },
        { name: "Chili flakes", quantity: "1/2 teaspoon" },
        { name: "Oregano", quantity: "1/2 teaspoon" },
        { name: "Bread crumbs", quantity: "1/2 cup" },
        { name: "Milk", quantity: "1/4 cup" },
        { name: "Oil", quantity: "for deep frying" },
        { name: "Wooden skewers", quantity: "6 pieces" },
      ],
      instructions: [
        "Cut the bread slices into small pieces and soak them in milk for a few seconds.",
        "Squeeze out excess milk and mix the bread with mashed potato, cheese, cornflour, salt, pepper, chili flakes, and oregano.",
        "Shape the mixture into small balls and insert a wooden skewer into each ball.",
        "Roll the lollipops in bread crumbs for a crispy coating.",
        "Heat oil in a pan and deep fry until golden brown and crispy.",
        "Drain on paper towels and serve hot with ketchup or a dipping sauce of your choice.",
      ],
      nutritionalInfo: {
        calories: "250",
        fat: "14g",
        protein: "7g",
        carbs: "24g",
      },
      dietaryInfo: ["Vegetarian"],
    },
    {
      id: 11,
      title: "Sweet Potato Boats",
      image: "../boats.jpg",
      rating: 4.7,
      description:
        "Baked sweet potatoes stuffed with a delicious mix of veggies, cheese, and spices for a healthy and flavorful meal.",
      prepTime: "15 minutes",
      cookTime: "45 minutes",
      servings: 4,
      cuisine: "American",
      category: "Main Course",
      ingredients: [
        { name: "Sweet potatoes", quantity: "4 medium" },
        { name: "Olive oil", quantity: "2 tablespoons" },
        { name: "Garlic", quantity: "2 cloves", notes: "minced" },
        { name: "Red bell pepper", quantity: "1 small", notes: "chopped" },
        { name: "Black beans", quantity: "1 cup", notes: "cooked" },
        { name: "Corn", quantity: "1/2 cup" },
        { name: "Cherry tomatoes", quantity: "1/2 cup", notes: "halved" },
        { name: "Spinach", quantity: "1/2 cup", notes: "chopped" },
        { name: "Cumin", quantity: "1 teaspoon" },
        { name: "Paprika", quantity: "1 teaspoon" },
        { name: "Salt", quantity: "to taste" },
        { name: "Black pepper", quantity: "to taste" },
        { name: "Cheddar cheese", quantity: "1/2 cup", notes: "shredded" },
        { name: "Sour cream", quantity: "for topping" },
        { name: "Cilantro", quantity: "for garnish" },
      ],
      instructions: [
        "Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.",
        "Wash the sweet potatoes, poke holes with a fork, and rub with olive oil.",
        "Bake for 40-45 minutes or until tender.",
        "While sweet potatoes are baking, heat olive oil in a pan over medium heat.",
        "Sauté garlic and red bell pepper for 2-3 minutes.",
        "Add black beans, corn, tomatoes, spinach, cumin, paprika, salt, and pepper. Cook for another 5 minutes.",
        "Once the sweet potatoes are cooked, let them cool slightly, then slice them in half lengthwise.",
        "Scoop out some of the flesh, mash it, and mix it with the sautéed veggie mixture.",
        "Stuff the mixture back into the sweet potato skins, top with shredded cheese, and bake for another 5 minutes until the cheese melts.",
        "Garnish with sour cream and cilantro before serving.",
      ],
      nutritionalInfo: {
        calories: "320",
        fat: "10g",
        protein: "9g",
        carbs: "50g",
      },
      dietaryInfo: ["Vegetarian", "Gluten-Free"],
    },
    {
      id: 12,
      title: "Walnut Chikki",
      image: "../chikki.jpg",
      rating: 4.8,
      description:
        "A crunchy and nutty Indian sweet made with walnuts and jaggery, perfect for a healthy energy boost.",
      prepTime: "10 minutes",
      cookTime: "15 minutes",
      servings: 10,
      cuisine: "Indian",
      category: "Dessert",
      ingredients: [
        { name: "Walnuts", quantity: "1 cup", notes: "chopped" },
        { name: "Jaggery", quantity: "3/4 cup", notes: "grated" },
        { name: "Ghee", quantity: "1 teaspoon" },
        { name: "Cardamom powder", quantity: "1/2 teaspoon" },
      ],
      instructions: [
        "Grease a plate or parchment paper with ghee and set aside.",
        "Heat a pan over medium heat and dry roast the walnuts for 2-3 minutes. Set aside.",
        "In the same pan, add ghee and jaggery. Stir continuously until the jaggery melts and forms a syrup.",
        "To check if the syrup is ready, drop a small amount into cold water; it should form a hard ball.",
        "Add roasted walnuts and cardamom powder to the syrup. Mix quickly and pour onto the greased plate.",
        "Flatten with a rolling pin or spatula and let it cool for 10 minutes.",
        "Once firm, break into pieces and store in an airtight container.",
      ],
      nutritionalInfo: {
        calories: "150",
        fat: "9g",
        protein: "3g",
        carbs: "18g",
      },
      dietaryInfo: ["Vegan", "Gluten-Free"],
    },
  ],
  newest: [
    {
      id: 13,
      title: "Summer Salad",
      image: "../salad.jpg",
      rating: 4.7,
      description:
        "A refreshing and vibrant salad packed with fresh fruits, greens, and a zesty dressing, perfect for hot summer days.",
      prepTime: "15 minutes",
      cookTime: "0 minutes",
      servings: 4,
      cuisine: "International",
      category: "Salad",
      ingredients: [
        { name: "Mixed greens", quantity: "4 cups" },
        { name: "Strawberries", quantity: "1 cup", notes: "sliced" },
        { name: "Blueberries", quantity: "1/2 cup" },
        { name: "Mango", quantity: "1 cup", notes: "diced" },
        { name: "Feta cheese", quantity: "1/2 cup", notes: "crumbled" },
        { name: "Walnuts", quantity: "1/4 cup", notes: "toasted" },
        { name: "Balsamic vinegar", quantity: "2 tablespoons" },
        { name: "Olive oil", quantity: "3 tablespoons" },
        { name: "Honey", quantity: "1 tablespoon" },
        { name: "Salt", quantity: "to taste" },
        { name: "Black pepper", quantity: "to taste" },
      ],
      instructions: [
        "In a large bowl, combine mixed greens, strawberries, blueberries, mango, feta cheese, and toasted walnuts.",
        "In a small bowl, whisk together balsamic vinegar, olive oil, honey, salt, and black pepper to make the dressing.",
        "Drizzle the dressing over the salad and toss gently to combine.",
        "Serve immediately and enjoy a refreshing summer delight!",
      ],
      nutritionalInfo: {
        calories: "180",
        fat: "10g",
        protein: "5g",
        carbs: "20g",
      },
      dietaryInfo: ["Vegetarian", "Gluten-Free"],
    },
    {
      id: 14,
      title: "Grilled Salmon",
      image: "../salmon.jpg",
      rating: 4.9,
      description:
        "A delicious and healthy grilled salmon dish with a tangy lemon and herb marinade.",
      prepTime: "10 minutes",
      cookTime: "15 minutes",
      servings: 2,
      cuisine: "American",
      category: "Main Course",
      ingredients: [
        { name: "Salmon fillets", quantity: "2", notes: "6 oz each" },
        { name: "Olive oil", quantity: "2 tablespoons" },
        { name: "Lemon juice", quantity: "2 tablespoons" },
        { name: "Garlic", quantity: "2 cloves", notes: "minced" },
        { name: "Fresh dill", quantity: "1 tablespoon", notes: "chopped" },
        { name: "Salt", quantity: "to taste" },
        { name: "Black pepper", quantity: "to taste" },
        { name: "Paprika", quantity: "1 teaspoon" },
        { name: "Honey", quantity: "1 teaspoon" },
      ],
      instructions: [
        "In a small bowl, whisk together olive oil, lemon juice, garlic, dill, salt, black pepper, paprika, and honey to make the marinade.",
        "Place salmon fillets in a shallow dish and pour the marinade over them. Let it sit for at least 10 minutes.",
        "Preheat the grill to medium-high heat and lightly oil the grates.",
        "Grill the salmon for 5-7 minutes per side, or until the fish flakes easily with a fork.",
        "Remove from the grill and serve immediately with lemon wedges.",
      ],
      nutritionalInfo: {
        calories: "320",
        fat: "18g",
        protein: "34g",
        carbs: "5g",
      },
      dietaryInfo: ["High-Protein", "Gluten-Free"],
    },
    {
      id: 15,
      title: "Loco Moco",
      image: "../loco.jpg",
      rating: 4.8,
      description:
        "A Hawaiian comfort food classic featuring a juicy hamburger patty, rich brown gravy, and a fried egg over rice.",
      prepTime: "10 minutes",
      cookTime: "20 minutes",
      servings: 2,
      cuisine: "Hawaiian",
      category: "Main Course",
      ingredients: [
        { name: "Ground beef", quantity: "½ pound", notes: "80/20 lean" },
        { name: "Salt", quantity: "½ teaspoon" },
        { name: "Black pepper", quantity: "½ teaspoon" },
        { name: "Worcestershire sauce", quantity: "1 teaspoon" },
        { name: "Eggs", quantity: "2" },
        { name: "Cooked white rice", quantity: "2 cups" },
        { name: "Butter", quantity: "1 tablespoon" },
        { name: "Onion", quantity: "½ cup", notes: "finely chopped" },
        { name: "Beef broth", quantity: "1 cup" },
        { name: "Soy sauce", quantity: "1 tablespoon" },
        {
          name: "Cornstarch",
          quantity: "1 teaspoon",
          notes: "mixed with 2 tbsp water",
        },
        {
          name: "Green onions",
          quantity: "2 tablespoons",
          notes: "chopped, for garnish",
        },
      ],
      instructions: [
        "In a bowl, mix ground beef with salt, black pepper, and Worcestershire sauce. Form into two patties.",
        "Heat a skillet over medium-high heat and cook the patties for about 4-5 minutes per side, until browned and cooked through.",
        "Remove patties and set aside. In the same skillet, melt butter and sauté onions until softened.",
        "Add beef broth and soy sauce, then stir in cornstarch mixture to thicken the gravy. Simmer for 2 minutes.",
        "In a separate pan, fry the eggs sunny-side up.",
        "To serve, place a scoop of rice on each plate, top with a beef patty, spoon over the gravy, and finish with a fried egg.",
        "Garnish with chopped green onions and serve hot.",
      ],
      nutritionalInfo: {
        calories: "550",
        fat: "28g",
        protein: "35g",
        carbs: "45g",
      },
      dietaryInfo: ["High-Protein"],
    },
    {
      id: 16,
      title: "Cinnamon Roll French Toast Casserole",
      image: "../toast.jpg",
      rating: 4.9,
      description:
        "A deliciously sweet and comforting breakfast casserole made with cinnamon rolls, eggs, and a rich glaze.",
      prepTime: "10 minutes",
      cookTime: "35 minutes",
      servings: 6,
      cuisine: "American",
      category: "Breakfast",
      ingredients: [
        {
          name: "Refrigerated cinnamon rolls",
          quantity: "2 cans",
          notes: "with icing",
        },
        { name: "Eggs", quantity: "4" },
        { name: "Milk", quantity: "½ cup" },
        { name: "Vanilla extract", quantity: "1 teaspoon" },
        { name: "Ground cinnamon", quantity: "1 teaspoon" },
        { name: "Maple syrup", quantity: "¼ cup" },
        { name: "Butter", quantity: "2 tablespoons", notes: "melted" },
        {
          name: "Powdered sugar",
          quantity: "2 tablespoons",
          notes: "for dusting (optional)",
        },
      ],
      instructions: [
        "Preheat oven to 350°F (175°C) and grease a baking dish.",
        "Cut the cinnamon rolls into small pieces and spread them evenly in the baking dish.",
        "In a bowl, whisk together eggs, milk, vanilla extract, ground cinnamon, and maple syrup.",
        "Pour the egg mixture over the cinnamon rolls and gently stir to coat.",
        "Drizzle melted butter over the top and bake for 30-35 minutes, or until golden brown.",
        "Let cool slightly, then drizzle with the icing from the cinnamon roll package.",
        "Dust with powdered sugar if desired and serve warm.",
      ],
      nutritionalInfo: {
        calories: "480",
        fat: "20g",
        protein: "7g",
        carbs: "68g",
      },
      dietaryInfo: ["Vegetarian"],
    },
    {
      id: 17,
      title: "Frikadellen (German Meat Patties)",
      image: "../frikadellen.jpg",
      rating: 4.7,
      description:
        "A traditional German dish made with seasoned ground meat, pan-fried to perfection.",
      prepTime: "15 minutes",
      cookTime: "20 minutes",
      servings: 4,
      cuisine: "German",
      category: "Main Course",
      ingredients: [
        { name: "Ground beef", quantity: "1 pound" },
        { name: "Ground pork", quantity: "½ pound" },
        {
          name: "Bread roll",
          quantity: "1",
          notes: "soaked in water and squeezed dry",
        },
        { name: "Egg", quantity: "1" },
        { name: "Onion", quantity: "1 small", notes: "finely chopped" },
        { name: "Garlic", quantity: "2 cloves", notes: "minced" },
        { name: "Mustard", quantity: "1 tablespoon" },
        { name: "Salt", quantity: "1 teaspoon" },
        { name: "Black pepper", quantity: "½ teaspoon" },
        { name: "Paprika", quantity: "½ teaspoon" },
        { name: "Parsley", quantity: "2 tablespoons", notes: "chopped" },
        {
          name: "Vegetable oil",
          quantity: "2 tablespoons",
          notes: "for frying",
        },
      ],
      instructions: [
        "In a large bowl, combine ground beef, ground pork, soaked bread roll, egg, onion, garlic, mustard, salt, pepper, paprika, and parsley.",
        "Mix well with your hands until fully combined.",
        "Shape the mixture into 4-6 patties, flattening slightly.",
        "Heat vegetable oil in a large skillet over medium heat.",
        "Fry the patties for about 5 minutes per side, or until golden brown and cooked through.",
        "Serve hot with mustard, bread, or potato salad.",
      ],
      nutritionalInfo: {
        calories: "350",
        fat: "22g",
        protein: "30g",
        carbs: "10g",
      },
      dietaryInfo: ["High Protein"],
    },
    {
      id: 18,
      title: "Coffee Jelly",
      image: "../jelly.jpg",
      rating: 4.8,
      description:
        "A refreshing Japanese dessert made with coffee-flavored gelatin cubes served with sweet cream.",
      prepTime: "10 minutes",
      cookTime: "5 minutes",
      servings: 4,
      cuisine: "Japanese",
      category: "Dessert",
      ingredients: [
        { name: "Strong brewed coffee", quantity: "2 cups" },
        { name: "Gelatin powder", quantity: "2 teaspoons" },
        { name: "Sugar", quantity: "2 tablespoons" },
        { name: "Water", quantity: "½ cup" },
        {
          name: "Sweetened condensed milk",
          quantity: "½ cup",
          notes: "or heavy cream for serving",
        },
      ],
      instructions: [
        "In a small bowl, sprinkle gelatin over ¼ cup of water and let it bloom for 5 minutes.",
        "In a saucepan, heat brewed coffee and sugar over medium heat until sugar dissolves.",
        "Add the bloomed gelatin mixture and stir until fully dissolved.",
        "Remove from heat and pour into a shallow dish or mold.",
        "Refrigerate for at least 2 hours or until set.",
        "Cut into small cubes and serve in a glass with sweetened condensed milk or cream.",
      ],
      nutritionalInfo: {
        calories: "120",
        fat: "4g",
        protein: "3g",
        carbs: "20g",
      },
      dietaryInfo: ["Vegetarian", "Low Fat"],
    },
  ],
  breakfast:[
    {
        id: 19,
        title: 'Poha',
        image: '../ban.jpg',
        rating: 4.7,
        description: 'A light and flavorful Indian breakfast dish made with flattened rice, spices, and peanuts.',
        prepTime: '10 minutes',
        cookTime: '10 minutes',
        servings: 2,
        cuisine: 'Indian',
        category: 'Breakfast',
        ingredients: [
            { name: 'Flattened rice (poha)', quantity: '1 cup' },
            { name: 'Oil', quantity: '2 tablespoons' },
            { name: 'Mustard seeds', quantity: '1 teaspoon' },
            { name: 'Cumin seeds', quantity: '1/2 teaspoon' },
            { name: 'Green chili', quantity: '1', notes: 'chopped' },
            { name: 'Onion', quantity: '1 small', notes: 'finely chopped' },
            { name: 'Turmeric powder', quantity: '1/2 teaspoon' },
            { name: 'Salt', quantity: 'to taste' },
            { name: 'Sugar', quantity: '1 teaspoon' },
            { name: 'Lemon juice', quantity: '1 tablespoon' },
            { name: 'Peanuts', quantity: '2 tablespoons', notes: 'roasted' },
            { name: 'Coriander leaves', quantity: '2 tablespoons', notes: 'chopped' },
            { name: 'Curry leaves', quantity: '6-7' }
        ],
        instructions: [
            'Rinse poha in water and drain excess water. Set aside for 5 minutes.',
            'Heat oil in a pan, add mustard seeds and cumin seeds. Let them splutter.',
            'Add chopped green chili, curry leaves, and onions. Sauté until onions turn translucent.',
            'Add turmeric powder, salt, and sugar. Stir well.',
            'Add the soaked poha and mix gently to coat with spices.',
            'Sprinkle lemon juice and mix again.',
            'Garnish with roasted peanuts and fresh coriander leaves.',
            'Serve hot with tea or yogurt.'
        ],
        nutritionalInfo: {
            calories: '250',
            fat: '8g',
            protein: '6g',
            carbs: '40g'
        },
        dietaryInfo: ['Vegetarian', 'Gluten-Free']
    }
  ]
};

export default recipes;
