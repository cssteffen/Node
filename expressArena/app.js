const express = require("express");
const morgan = require("morgan");
const app = express();

//This is middleware that requests pass through
//on their way to the final handler
app.use(morgan("dev"));

//this is the final request handler
//function that responds with text to GET request to root URL(/)
app.get("/", (req, res) => {
  res.send("Changing expression - Hello Express!");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("Your pizza is on the way!");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("We don't serve that here. Never call again!");
});

app.get("/echo", (req, res) => {
  const responseText = `here are some details of you request:
    Base URL: ${req.baseUrl}
    Remote IP: ${req.ip}
    Host: ${req.hostname}
    Path: ${req.path}
    `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get("/hello", (req, res) => {
  res.status(204).send();
});

app.get("/video", (req, res) => {
  const video = {
    title: "Cats falling over",
    description: "15 minutes of hilarious fun as cats fall over",
    length: "15.40"
  };
  res.json(video);
});

app.get("/colors", (req, res) => {
  const colors = [
    {
      name: "red",
      rgb: "FF0000"
    },
    {
      name: "green",
      rgb: "00FF00"
    },
    {
      name: "blue",
      rgb: "0000FF"
    }
  ];
  res.json(colors);
});

app.get("/grade", (req, res) => {
  //get the mark from the query
  const { mark } = req.query;

  //do some validation
  if (!mark) {
    //mark is required
    return res.status(400).send("Please provide a mark");
  }
  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    //mark must be a number
    return res.status(400).send("Mark must be in range 0-100");
  }
  if (numericMark >= 90) {
    return res.send("A");
  }
  if (numericMark >= 80) {
    return res.send("B");
  }
  if (numericMark >= 70) {
    return res.send("C");
  }
  res.send("F");
});

app.get("/greetings", (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if (!name) {
    //3. name was not provided
    return res.status(400).send("Please provide a name");
  }

  if (!race) {
    //3. race was not provided
    return res.status(400).send("Please provide a race");
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom. We are glad you are here!`;

  //6. send the response
  res.send(greeting);
});

/* ======== ASSIGNMENT #1 ============ */
app.get("/sum", (req, res) => {
  //1. get values from the request
  const a = req.query.a;
  const b = req.query.b;

  //2. validate the values //3. send error if not provided
  if (!a) {
    return res.status(400).send("Please provide query a");
  }
  if (!b) {
    return res.status(400).send("Please provide query b");
  }

  //4. and 5 queries are valid - so do the processing.
  const parseA = Number.parseFloat(a, 10);
  const parseB = Number.parseFloat(b, 10);
  const add = parseA + parseB;
  const sum = `The sum of ${a} and ${b} is ${add}`;

  //6. send the response
  res.send(sum);
});

/* ======== ASSIGNMENT #2 ============ */
app.get("/cipher", (req, res) => {
  //1. get query value
  const text = req.query.text;
  const shift = req.query.shift;

  //2. validate the query //3. send error if not provided
  if (!text) {
    res.status(400).send("Please provide text");
  }

  if (!shift) {
    res.status(400).send("Please provde shift");
  }

  const parseShift = Number.parseInt(shift, 10);
  if (Number.isNaN(parseShift)) {
    return res.status(400).send("shift must be a number");
  }

  //4. and 5. queries are valid - so do the processing.

  // Make the text uppercase for convenience
  // Create a loop over the characters, for each letter, covert
  // using the shift
  const base = "A".charCodeAt(0); //get char code

  const cipher = text
    .toUpperCase()
    .split("") //create an array of characters
    .map(char => {
      //map each original char to converted char
      const code = char.charCodeAt(0); //get the char code

      //if it is not one of the 26 letters ignore it
      if (code < base || code > base + 26) {
        return char;
      }

      //otherwise conver it, get distance from A
      let diff = code - base;
      diff = diff + parseShift;

      //in case shift takes the value past z, cycle back to the beginning
      diff = diff % 26;

      //convert back to a character
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(""); //construct a String from the array

  //Return the response
  res.status(200).send(cipher);
});

/* ====== my ORIGINAL funcion CODE to #2===============
  const textEncript = text.map(value => {
    const newValue = value.charCodeAt(0) + parseShift;
    return String.fromCharCode(newValue);
  });


  //6. send the response
  res.send(textEncript);
}); */

/* ======== ASSIGNMENT #3 ============ */

app.get("/lotto", (req, res) => {
  //1. get query values
  const { numbers } = req.query; //why not .numbers?

  //2. validate and send error if errors
  if (!numbers) {
    return res.status(200).send("numbers is required");
  }
  if (!Array.isArray(numbers)) {
    return res.status(200).send("numbers must be an array");
  }
  const guesses = numbers
    .map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

  if (guesses.length != 6) {
    return res
      .status(400)
      .send("numbers must contain 6 integers between 1 and 20");
  }

  //fully validated numbers

  //here are theh 20 numbers to choose from
  const stockNumbers = Array(20)
    .fill(1)
    .map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for (let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !guesses.includes(n));

  //construct a response
  let responseText;

  switch (diff.length) {
    case 0:
      responseText = "Wow! Unbelievable! You could have won the mega millions!";
      break;
    case 1:
      responseText = "Congratulations! You won $100";
      break;
    case 2:
      responseText = "Congratulations, you win a free ticket!";
      break;
    default:
      responseText = "Sorry, you lose";
  }

  res.json({ guesses, winningNumbers, diff, responseText });

  res.send(responseText);

  /* ====== my ORIGINAL funcion CODE to #2===============
  for (let i = 0; i < parseNumbers.length; i++) {
    if (parseNumbers[i] > 20 || parseNumbers[i] < 1) {
      return res.status(400).send("Numbers must be between 1 and 20");
    }
  }*/

  //4. and 5. queries are valid - so do the processing.
  //const lottoNumbers =
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
