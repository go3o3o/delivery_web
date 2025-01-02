import "./App.css";

import React, { Component } from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" />
        </Routes>
      </Layout>
    );
  }
}
