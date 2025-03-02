import "./App.css";

import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ShopListPage from "./pages/ShopListPage/ShopListPage";
import ShopDetailPage from "./pages/ShopDetailPage/ShopDetailPage";
import { StoreProvider } from "./providers/StoreProvider";

export default class App extends Component {
  render() {
    return (
      <StoreProvider>
        <Header cartItemCount={0} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:shopCategoryId" element={<ShopListPage />} />
          <Route path="/shop/:shopId" element={<ShopDetailPage />} />
        </Routes>
        <Footer />
      </StoreProvider>
    );
  }
}
