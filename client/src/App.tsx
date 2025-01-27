import "./App.css";

import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./component/Header";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./component/Footer";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header cartItemCount={0} />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}
