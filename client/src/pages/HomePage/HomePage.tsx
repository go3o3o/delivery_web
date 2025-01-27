import React, { Component, CSSProperties } from "react";
import { colorHex, colors } from "../../constants";

import ShopCategoryList from "./ShopCategoryList";

type InjectedProps = {};

export default class HomePage extends Component<InjectedProps> {
  render() {
    return (
      <div style={styles.container}>
        <ShopCategoryList />
      </div>
    );
  }
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: colors.UNCHANGE_WHITE,
    position: "relative",
    height: "100%",
    width: "100%",
    alignItems: "center",
    minWidth: 850,
  },
};
