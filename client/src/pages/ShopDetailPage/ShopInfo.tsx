import React, { CSSProperties } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid2,
  Rating,
  Typography,
} from "@mui/material";
import useGetShop from "@/hooks/queries/useGetShop";

type ShopInfoProps = {
  id: number;
};

const ShopInfo: React.FC<ShopInfoProps> = ({ id }) => {
  const { data: shop, status } = useGetShop(id);

  if (status === "pending") {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === "error") {
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        Error fetching data
      </Typography>
    );
  }

  return (
    <>
      <Card variant="outlined">
        <Typography variant="h6" padding="10px">
          {shop.name}
        </Typography>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            image={shop.imageUrl || "https://placehold.co/200"}
            alt={shop.name}
            sx={styles.image}
          />
          <Box sx={{ flexDirection: "column" }}>
            <CardContent sx={{ padding: "10px" }}>
              <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                <Rating
                  name="read-only"
                  value={shop.rating}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <Typography onClick={() => {}} sx={{ ml: 0.5 }} variant="body2">
                  {shop.rating || 0.0}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                ({shop.reviewCount} reviews)
              </Typography>
              <Typography variant="body2" gutterBottom>
                최소주문금액 {shop.minOrderPrice}원
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Card>
    </>
  );
};

const styles: { [key: string]: CSSProperties } = {
  image: {
    width: 70,
    height: 70,
    padding: "10px",
    verticalAlign: "center",
  },
  deliveryTime: {
    display: "flex",
    alignItems: "center",
    gap: 0.2,
    position: "absolute",
    color: "#999",
    bottom: "12px",
    right: "10px",
  },
};

export default ShopInfo;
