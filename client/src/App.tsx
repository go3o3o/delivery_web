import "./App.css";

import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ShopListPage from "./pages/ShopListPage/ShopListPage";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header cartItemCount={0} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:shopCategoryId" element={<ShopListPage />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}
