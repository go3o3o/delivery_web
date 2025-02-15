import React, { CSSProperties, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AppBar,
  Box,
  Card,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import TabPanel from "@/component/TabPanel";
import ShopInfo from "./ShopInfo";
import TabMenu from "./TabMenu";
import TabReview from "./TabReview";
import TabInfo from "./TabInfo";

function ShopDetailPage() {
  const { shopId } = useParams();
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container style={styles.container}>
      <ShopInfo id={Number(shopId)} />
      <Card variant="outlined" style={{ marginTop: 10 }}>
        <Box sx={{ bgcolor: "background.paper" }}>
          <AppBar position="static" style={styles.tab}>
            <Tabs
              value={tab}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
            >
              <Tab label="메뉴" />
              <Tab label="리뷰" />
              <Tab label="정보" />
            </Tabs>
          </AppBar>
          <TabPanel value={tab} index={0}>
            <TabMenu />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <TabReview />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <TabInfo />
          </TabPanel>
        </Box>
      </Card>
    </Container>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: 1020,
    minWidth: 320,
    width: "100%",
    margin: "0 auto",
    padding: "20px",
    boxShadow: "none",
  },
  tab: {
    backgroundColor: "#fff",
  },
};

export default ShopDetailPage;
