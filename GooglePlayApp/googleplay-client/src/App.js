import React from "react";
import AppItem from "./components/AppItem";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      sort: "",
      genres: "",
      error: null
    };
  }

  setGenres(genres) {
    this.setState({
      genres
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    //construct a URL with the query string
    const baseUrl = "http://localhost:8000/apps";
    const params = [];

    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }

    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }

    const query = params.join("&");
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null //reset errors
        });
      })
      .catch(err => {
        this.setState({
          error: "Sorry, could not get apps at this time."
        });
      });
  }

  render() {
    //map over all the apps
    const apps = this.state.apps.map((app, i) => {
      return <AppItem {...app} key={i} />;
    });

    return (
      <main className="app">
        <h1>Google Play Apps</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className="genresBox">
              <label htmlFor="sort">Genres: </label>
              <select
                id="genres"
                name="genres"
                onChange={e => this.setGenres(e.target.value)}
              >
                <option value=" ">None</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>
                <option value="Arcade">Arcade</option>
                <option value="Card">Card</option>
              </select>
            </div>

            <div className="sortBox">
              <label htmlFor="sort">Sort: </label>
              <select
                id="sort"
                name="sort"
                onChange={e => this.setSort(e.target.value)}
              >
                <option value=" ">None</option>
                <option value="rating">Rating</option>
                <option value="app">App</option>
              </select>
            </div>

            <button type="submit">Search</button>
          </form>
          <div className="App_error">{this.state.error}</div>
        </div>
        {apps}
      </main>
    );
  }
}
