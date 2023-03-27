import React from "react";
import logo from "../../logo.svg";

export default function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
      <h2>Random User</h2>
    </header>
  );
}
