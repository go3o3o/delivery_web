import React, { CSSProperties, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { colorHex, colors } from "../constants";
import SearchAddress from "./SearchAddress";

type HeaderProps = {
  cartItemCount: number; // 장바구니에 담긴 아이템 수
};

const Header: React.FC<HeaderProps> = ({ cartItemCount }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={styles.container}>
      <Box
        sx={{
          maxWidth: 1020,
          minWidth: 320,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            요니의 배달
          </Typography>

          <Button
            color="inherit"
            variant="outlined"
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>

          <IconButton
            size="large"
            color="inherit"
            onClick={() => navigate("/cart")}
            style={styles.cartButton}
            sx={{ marginLeft: 2 }}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Box>
      <SearchAddress />
    </AppBar>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: colorHex.RED,
    boxShadow: "none",
  },
};

export default Header;
