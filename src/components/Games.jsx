import React, { Component } from "react";
import GameItem from "./GameItem";
import Pagination from "./Pagination";

class Games extends Component {
  state = {
    games: [],
    page: 1,
    sortByScore: 0,
    sortByPlatform: 0,
    sortByYear: 0,
    query: "",
  };

  componentDidMount() {
    let games = JSON.parse(localStorage.getItem("sapient_games"));
    if (games) {
      this.setState({ games });
      console.log(games[1]);
      return;
    }
    fetch("./data/games.json")
      .then((res) => res.json())
      .then((games) => {
        this.setState({ games });
        localStorage.setItem("sapient_games", JSON.stringify(games));
        console.log(games[1]);
      });
  }

  changePage = (x) => {
    this.setState({ page: this.state.page + x });
  };

  onSearchQueryChange = (e) => {
    this.setState({ query: e.target.value, page: 1 });
  };

  onSortChange = (e) => {
    this.setState({ [e.target.name]: e.target.checked ? 1 : 0 });
  };

  onSortValueChange = (e) => {
    this.setState({ [e.target.name]: parseInt(e.target.value) });
  };

  render() {
    let filteredGames = [...this.state.games];
    if (this.state.query) {
      filteredGames = filteredGames.filter((game) =>
        game.title
          .toString()
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      );
    }
    filteredGames.sort((a, b) => this.state.sortByScore * (b.score - a.score));
    filteredGames.sort(
      (a, b) => this.state.sortByYear * (b.release_year - a.release_year)
    );
    filteredGames.sort(
      (a, b) => this.state.sortByPlatform * b.platform.localeCompare(a.platform)
    );
    const page = this.state.page;
    const lastPage = Math.ceil(filteredGames.length / 20);
    const from = 20 * (page - 1) + 1,
      to = 20 * page;
    let gameContent;
    if (page > lastPage || page < 1) {
      gameContent = (
        <div className="alert alert-danger text-center" role="alert">
          <strong>Invalid page number!</strong> Please try again!
        </div>
      );
    } else if (filteredGames.length) {
      gameContent = filteredGames
        .slice(from - 1, to)
        .map((game, i) => <GameItem key={i} game={game} />);
    } else {
      gameContent = (
        <div className="alert alert-danger text-center" role="alert">
          <strong>No games found!</strong> Please try again!
        </div>
      );
    }
    return (
      <div className="container px-0">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name..."
          value={this.state.query}
          onChange={this.onSearchQueryChange}
        />
        <div className="row">
          <div className="col-sm-6 mt-2">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="sortByScore"
                  checked={this.state.sortByScore}
                  onChange={this.onSortChange}
                />
                Sort by Score
              </label>
              <select
                className="ml-2 form-control form-control-sm"
                name="sortByScore"
                value={this.state.sortByScore}
                onChange={this.onSortValueChange}
                hidden={!this.state.sortByScore}
              >
                <option value="-1">Lowest First</option>
                <option value="1">Highest First</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6 mt-2">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="sortByPlatform"
                  checked={!!this.state.sortByPlatform}
                  onChange={this.onSortChange}
                />
                Sort by Platform
              </label>
              <select
                className="ml-2 form-control form-control-sm"
                name="sortByPlatform"
                value={this.state.sortByPlatform}
                onChange={this.onSortValueChange}
                hidden={!this.state.sortByPlatform}
              >
                <option value="-1">A-Z</option>
                <option value="1">Z-A</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6 mt-2">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="sortByYear"
                  checked={!!this.state.sortByYear}
                  onChange={this.onSortChange}
                />
                Sort by Year
              </label>
              <select
                className="ml-2 form-control form-control-sm"
                name="sortByYear"
                value={this.state.sortByYear}
                onChange={this.onSortValueChange}
                hidden={!this.state.sortByYear}
              >
                <option value="-1">Oldest First</option>
                <option value="1">Latest First</option>
              </select>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          lastPage={lastPage}
          onPageChange={this.changePage}
        />
        <p className="text-center">
          Showing <b>{from}</b>-
          <b>{page === lastPage ? filteredGames.length : to}</b> of{" "}
          <b>{filteredGames.length}</b>
        </p>
        <div className="container-fluid px-0 my-4">{gameContent}</div>
        <Pagination
          page={page}
          lastPage={lastPage}
          onPageChange={this.changePage}
        />
      </div>
    );
  }
}

export default Games;
