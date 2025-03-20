const express = require('express');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


console.log("I'm Starting");

app.get('/', (req, res) => {
    res.send('<h1>Hello There!<h2>')
});
/*
1. Be Polite, Greet the User
Task: Create a route that responds to URLs like /greetings/<username-parameter>.

Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.

Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”
*/

app.get('/greetings/:userName', (req, res) => {
    res.send(`Hello there, ${req.params.userName}!`)
});

/*
2. Rolling the Dice
Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.

Examples: Matches routes like /roll/6 or /roll/20.

Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.

Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”

*/

app.get('/roll/:numberParam', (req, res) => {
    //parse input as an integer
    const newInteger = parseInt(req.params.numberParam);
    //if var is NaN, return error
    if (isNaN(newInteger)) {
        res.status(400).send("<h1>You must specify a number.</h1>")
    }
    //if less than 1, throw an error
    if (newInteger < 1) {
        res.status(400).send("<h1>You must specify a number.</h1>")
    }
    //if a number is defined, send the roll!
    res.send(`You rolled a ${req.params.numberParam}`)
});

/*
3. I Want THAT One!
Task: Create a route for URLs like /collectibles/<index-parameter>.

Examples: Matches routes such as /collectibles/2 or /collectibles/0.

Data Array:

Copy
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”

Response: Should describe the item at the given index, like “So, you want the shiny ball? For 5.95, it can be yours!” Include both the name and price properties.
*/


app.get('/collectibles/:indexParam', (req, res) => {
    // parse input index
    const itemIdx = parseInt(req.params.indexParam);
    //if the route input is a number, less than the length of the collectibles but not less than 0, send the item
    if (!isNaN(itemIdx) && itemIdx >= 0 && itemIdx < collectibles.length) {
        //create const for the the name 
        const itemName = collectibles[req.params.indexParam].name;
        //create const for the price
        const itemPrice = collectibles[req.params.indexParam].price;
        //return the item
        res.send(`So, you want the ${itemName}? For ${itemPrice}, it can be yours!`);
    }
    //if not, throw an error
    else {
        res.status(400).send("This item is not yet in stock. Check back soon!")
    }
})


/*
4. Filter Shoes by Query Parameters
Use the following array of shoes in this challenge:

Copy
  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];
Task: Create a route /shoes that filters the list of shoes based on query parameters.

Query Parameters:

min-price: Excludes shoes below this price.
max-price: Excludes shoes above this price.
type: Shows only shoes of the specified type.
No parameters: Responds with the full list of shoes.
*/

app.get('/shoes', (req, res) => {
    //create the variables for the query params
    let {minPrice, maxPrice, type} = req.query;

    let shoeLists = shoes;

    if (minPrice) {
        //if min price, filter the shoes = or > to the input
        shoeLists = shoeLists.filter(shoe => shoe.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
        //if max price, filter the shoes = or < to the input
        shoeLists = shoeLists.filter(shoe => shoe.price <= parseFloat(maxPrice));
    }
    
    if (type) {
        //if input is type, filter out the shoe types with only the same input 
        shoeLists = shoeLists.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }
    //if no parameter(/shoes), show the full list of shoes
    res.send(shoeLists);
});



//listen for the request on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
})

