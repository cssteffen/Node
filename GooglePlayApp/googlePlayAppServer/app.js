const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());

const playstoreApps = require("./playstore.js"); //requires data stored on database

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  if (genres) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      return res
        .status(400)
        .send(
          "Genres must be one of Action, Puzzle, Strategy, Casual, Arcade or Card"
        );
    }
  }

  let results = playstoreApps;
  //let results = playstoreApps.filter(app => app.Genres.includes(genres));
  if (genres) {
    results = playstoreApps.filter(app => app.Genres.includes(genres));
  }
  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);

  //ALL OUR CODE HERE
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});

/*
App: "Block Puzzle Classic Legend !",
    Category: "GAME",
    Rating: 4.2,
    Reviews: "17039",
    Size: "4.9M",
    Installs: "5,000,000+",
    Type: "Free",
    Price: "0",
    "Content Rating": "Everyone",
    Genres:
*/
