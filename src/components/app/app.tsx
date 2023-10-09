import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { FibonacciPage } from "../../pages/fibonacci-page/fibonacci-page";
import { ListPage } from "../../pages/list-page/list-page";
import { MainPage } from "../../pages/main-page/main-page";
import { QueuePage } from "../../pages/queue-page/queue-page";
import { StringComponent } from "../../pages/string-page/string";
import { SortingPage } from "../../pages/sorting-page/sorting-page";
import { StackPage } from "../../pages/stack-page/stack-page";

import "./app.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recursion" element={<StringComponent />} />
          <Route path="/fibonacci" element={<FibonacciPage />} />

          <Route path="/sorting" element={<SortingPage />} />

          <Route path="/stack" element={<StackPage />} />

          <Route path="/queue" element={<QueuePage />} />

          <Route path="/list" element={<ListPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
