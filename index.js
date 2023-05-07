const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5009;

const cuisines = require('./data/cuisine.json');
const chefs = require('./data/chefs.json');
const recipes = require('./data/recipes.json');

app.use(cors());

app.get('/', (req, res) =>{
    res.send('Recipe server is running')
});

app.get('/cuisines', (req, res) =>{
    res.send(cuisines);
})


app.get('/chefs', (req, res) =>{
    res.send(chefs);
})

app.get('/recipes', (req, res) =>{
    res.send(recipes);
})

// Get specific chef details with specific id:
app.get('/chefs/:id', (req, res) =>{
    const id = req.params.id;
    console.log(id);

    const specificChef = chefs.find(idNumber => idNumber.id === id);
    res.send(specificChef);
})

//  Specific cuisine
app.get('/cuisines/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id); // id number as number not as string
    
    // As there is no category id '0' in cuisine.json, but in chefs.json, we need to validate the category
    if(id === 0) {
        res.send(chefs) // no chef, all cuisine
    }
    else{
        const specificCuisine = chefs.filter(idNumber => parseInt(idNumber.cuisine) === id);
        res.send(specificCuisine);
    }
})

// Specific Recipe
app.get('/recipes/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const specificRecipe = recipes.find(recipe => recipe.chef_id === id);
    res.send(specificRecipe);
})


app.listen(port, () => {
    console.log(`Chef recipe server listening on ${port}`)
});

/**
 * server github link
 * https://github.com/programming-hero-web-course-4/b7a10-chef-recipe-hunter-server-side-fxinfo24
 */