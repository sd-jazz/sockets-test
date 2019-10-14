import React from 'react';
import './App.css';
import routes from "./routes"
import NavBar from "./components/navBar/NavBar"

function App() {
  return (
    <div className="App__Master">
      <NavBar />
      {routes}
    </div>
  );
}

export default App;
