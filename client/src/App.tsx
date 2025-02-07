import "./App.css";

import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "./api/queryClient";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ShopListPage from "./pages/ShopListPage/ShopListPage";

export default class App extends Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <Header cartItemCount={0} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/:shopCategoryId" element={<ShopListPage />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    );
  }
}
