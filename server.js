const express = require('express');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
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
    res.send(`So, you want the ${collectibles[req.params.indexParam].name}? For ${collectibles[req.params.indexParam].price}, it can be yours!`)
})

//listen for the request on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
})

