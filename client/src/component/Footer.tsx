import React, { CSSProperties } from "react";
import { Box, Typography } from "@mui/material";

import { colorHex, colors } from "../constants";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: colorHex.RED,
        color: "white",
        textAlign: "center",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <Typography variant="body1">
        &copy; 2025 Yogiyo Clone. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
