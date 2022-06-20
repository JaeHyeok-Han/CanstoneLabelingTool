import React from 'react';
import style from "../styles/Header.module.css";

function Header() {
  return (
    <header className={style.header}>
      <h1>
        ABSA 라벨링 툴
      </h1>
      <small>
        made by. Jaehyeok-Han
      </small>
    </header>
  )
}

export default Header;