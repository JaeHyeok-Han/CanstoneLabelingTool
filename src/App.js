import React from 'react';
import style from "./styles/App.module.css";
import Header from "./components/Header.js";
import ReviewBox from "./components/ReviewBox.js";

function App() {
  return (
    <div className={style.App}>
      <Header />
      <ReviewBox />
    </div>
  );
}

export default App;
