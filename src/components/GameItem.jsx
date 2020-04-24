import React from "react";

const GameItem = ({
  game: { title, editors_choice, platform, release_year, genre, score },
}) => {
  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-3 text-muted">
          <div className="badge badge-secondary p-1">{release_year}</div>
          {editors_choice === "Y" ? (
            <div className="badge badge-success ml-2 p-1">Editor's Choice</div>
          ) : (
            ""
          )}
        </h6>

        <div
          className="mb-1 mr-2"
          style={{ display: "inline", fontWeight: "bold", fontSize: 20 }}
        >
          <i className="fas fa-star text-warning"></i> {score}
        </div>
        <div className="badge badge-pill badge-primary m-2 p-2">{platform}</div>
        {genre.split(",").map((g, i) => (
          <div key={i} className="badge badge-pill badge-danger m-2 p-2">
            {g}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameItem;
