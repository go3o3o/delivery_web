import "./App.css";

import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Header from "./component/Header";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./component/Footer";
import queryClient from "./api/queryClient";

export default class App extends Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <Header cartItemCount={0} />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    );
  }
}
