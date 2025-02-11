import React, { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import useGetInfiniteShopCategories from "@/hooks/queries/useGetInfiniteShopCategories";

function ShopCategoryList() {
  const {
    data: shopCategories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetInfiniteShopCategories();

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
    <Box sx={{ padding: "20px" }}>
      <Grid2 container spacing={2}>
        {shopCategories.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.list.map((category) => (
              <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={category.id}>
                <CardActionArea component={RouterLink} to={`/${category.id}`}>
                  <Card variant="outlined" sx={{ display: "flex" }}>
                    <CardContent sx={{ position: "absolute" }}>
                      <Typography variant="h6">{category.name}</Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      image={category?.imageUrl || "https://placehold.co/218"}
                      alt={category.name}
                    />
                  </Card>
                </CardActionArea>
              </Grid2>
            ))}
          </React.Fragment>
        ))}
      </Grid2>

      {/* Infinite Scroll Trigger */}
      {hasNextPage && (
        <Box
          ref={loadMoreRef}
          display="flex"
          justifyContent="center"
          mt={4}
          mb={4}
        >
          {isFetchingNextPage && <CircularProgress />}
        </Box>
      )}
    </Box>
  );
}

export default ShopCategoryList;
