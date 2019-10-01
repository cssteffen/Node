import React from "react";
import Book from "./components/Book";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: "",
      sort: "",
      error: null
    };
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    //construct a URL witht he query string
    const baseUrl = "http://localhost:8000/books";
    const params = [];

    if (this.state.search) {
      params.push(`search=${this.state.search}`);
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
          books: data,
          error: null //reset errors
        });
      })
      .catch(err => {
        this.setState({
          error: "Sorry, could not get books at this time."
        });
      });
  }

  render() {
    //map over all the books
    const books = this.state.books.map((book, i) => {
      return <Book {...book} key={i} />;
    });

    return (
      <main className="app">
        <h1>NYT Best Sellers</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search: </label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}
            />
            <br />

            <label htmlFor="sort">Sort: </label>
            <select
              id="sort"
              name="sort"
              onChange={e => this.setSort(e.target.value)}
            >
              <option value=" ">None</option>
              <option value="title">Title</option>
              <option value="rank">Rank</option>
            </select>
            <br />

            <button type="submit">Search</button>
          </form>
          <div className="App_error">{this.state.error}</div>
        </div>
        {books}
      </main>
    );
  }
}
