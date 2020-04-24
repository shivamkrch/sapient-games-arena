import React from "react";
import "./App.css";
import Games from "./components/Games";

function App() {
  return (
    <div className="App container-fluid p-3 mt-2 bg-light">
      <header className="App-header mb-3">
        <h3 style={{ textAlign: "center" }}>Sapient Games Arena</h3>
      </header>
      <Games />
    </div>
  );
}

export default App;
