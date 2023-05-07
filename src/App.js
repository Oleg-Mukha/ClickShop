import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="font-bodyFont">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
