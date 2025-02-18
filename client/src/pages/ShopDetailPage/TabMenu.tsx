import React, { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import useGetInfiniteMenuGroups from "@/hooks/queries/useGetInfiniteMenuGroups";
import TabMenuList from "./TabMenuList";

function TabMenu() {
  const { shopId } = useParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    status,
  } = useGetInfiniteMenuGroups(Number(shopId));

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

  const processedData =
    data?.pages.flatMap((page) => page.list.flatMap((item) => item)) || [];
  const recommendMenus = processedData
    .flatMap((group) => group.menus.filter((menu) => menu.isRecommend))
    .map((menu) => menu);

  return (
    <Box style={{ padding: 0 }}>
      {/* 인기메뉴 */}
      {recommendMenus?.length > 0 && (
        <TabMenuList
          id={0}
          name={"👑 인기메뉴"}
          expanded={true}
          menus={recommendMenus}
        />
      )}

      {/* 일반메뉴 */}
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.list.map((group) => (
            <TabMenuList
              id={group.id}
              name={group.name}
              expanded={false}
              menus={group.menus}
            />
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
}

const styles: { [key: string]: CSSProperties } = {};

export default TabMenu;
