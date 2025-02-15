import React, { CSSProperties } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@/component/Accordion";
import { Menu } from "@/types";

type TabMenuListProps = {
  id: number;
  name: string;
  expanded: boolean;
  menus?: Menu[];
};

const TabMenuList: React.FC<TabMenuListProps> = ({
  id,
  name,
  expanded,
  menus,
}) => {
  return (
    <Accordion key={id} defaultExpanded={expanded}>
      <AccordionSummary
        aria-controls={`panel${id}-content`}
        id={`panel${id}-header`}
        sx={styles.groupContainer}
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={styles.menuContainer}>
        {menus.length > 0 ? (
          menus.map((menu) => (
            <List key={`${id}-${menu.id}`} style={{ padding: 0 }}>
              <ListItemButton>
                <ListItemText
                  sx={{ margin: 0, paddingRight: "10px" }}
                  primary={menu.name}
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={styles.menuDescription}
                      >
                        {menu.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={styles.menuPrice}
                      >
                        {menu.price}원
                      </Typography>
                    </>
                  }
                />
                {menu.imageUrl && (
                  <img
                    src={menu.imageUrl}
                    alt={menu.name}
                    style={styles.menuImage}
                  />
                )}
              </ListItemButton>
              <Divider />
            </List>
          ))
        ) : (
          <Typography component="span" style={{ padding: "16px" }}>
            메뉴가 없습니다.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

const styles: { [key: string]: CSSProperties } = {
  groupContainer: {
    boxShadow: "none",
    backgroundColor: "#3333",
  },
  menuContainer: {
    padding: 0,
  },
  menuDescription: {
    display: "block",
    color: "#666",
  },
  menuPrice: {
    display: "block",
    fontWeight: "bold",
  },
  menuImage: {
    width: "112px",
    height: "80px",
  },
};

export default TabMenuList;
