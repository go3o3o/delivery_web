import React, { Component } from "react";
import { Box } from "@mui/material";

import ShopCategoryList from "./ShopCategoryList";

type InjectedProps = {};

export default class HomePage extends Component<InjectedProps> {
  render() {
    return (
      <Box
        sx={{
          maxWidth: 1020,
          minWidth: 320,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <ShopCategoryList />
      </Box>
    );
  }
}
