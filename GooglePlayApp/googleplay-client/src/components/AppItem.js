import React from "react";
import "./appItem.css";

export default function AppItem(props) {
  return (
    <div className="appItem">
      <h2>{props.App}</h2>
      <div className="app_rating">Rating: {props.Rating}</div>
      <div className="app_size">Size: {props.Size}</div>
      <div className="app_price">
        Price:{" "}
        {new Intl.NumberFormat("en-USD", {
          style: "currency",
          currency: "USD"
        }).format(props.Price)}
      </div>
    </div>
  );
}

/*
     <FormatCurrency currency="EUR" placeholder="0.00" className="new-class-name" value={1000} disabled={true} onChange={(values) => console.log('values: ', values)} />

  {
    App: "ROBLOX",
    Category: "GAME",
    Rating: 4.5,
    Reviews: "4447388",
    Size: "67M",
    Installs: "100,000,000+",
    Type: "Free",
    Price: "0",
    "Content Rating": "Everyone 10+",
    Genres: "Adventure;Action & Adventure",
    "Last Updated": "July 31, 2018",
    "Current Ver": "2.347.225742",
    "Android Ver": "4.1 and up"
  },
*/
