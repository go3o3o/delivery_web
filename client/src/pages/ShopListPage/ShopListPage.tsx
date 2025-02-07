import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Stack,
} from "@mui/material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import useGetInfiniteSearchShops from "@/hooks/queries/useGetInfiniteSearchShops";

function ShopListPage() {
  const { shopCategoryId } = useParams();
  const [keyword, setKeyword] = useState("");
  const {
    data: shops,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    status,
  } = useGetInfiniteSearchShops(keyword, Number(shopCategoryId));

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    <Box sx={styles.container}>
      <Grid2 container spacing={2}>
        {shops.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.list.map((shop) => (
              <Grid2 size={{ sm: 6 }} key={shop.id}>
                <CardActionArea component={RouterLink} to={`/shop/${shop.id}`}>
                  <Card sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      image={shop.imageUrl || "https://placehold.co/200"}
                      alt={shop.name}
                      sx={styles.image}
                    />
                    <Box sx={{ flexDirection: "column" }}>
                      <CardContent sx={{ padding: "10px" }}>
                        <Typography component="div" variant="subtitle1">
                          {shop.name}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" sx={{ color: "#ffa800" }}>
                            ★{shop.rating}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ marginLeft: 0.5, color: "#999" }}
                          >
                            | 리뷰 {shop.reviewCount}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ color: "text.secondary" }}
                        >
                          {shop.minOrderPrice}원 이상 배달
                        </Typography>
                      </CardContent>
                      <Box sx={styles.deliveryTime}>
                        <DeliveryDiningIcon fontSize="small" />
                        <Typography variant="body2">
                          {shop.deliveryTime}분
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </CardActionArea>
              </Grid2>
            ))}
          </React.Fragment>
        ))}
      </Grid2>
    </Box>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: 1020,
    minWidth: 320,
    width: "100%",
    margin: "0 auto",
    padding: "20px",
  },
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

export default ShopListPage;
