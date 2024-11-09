"use client";

import React, { useState } from "react";
import { Drawer, IconButton, Box, AppBar, Toolbar } from "@mui/material";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon } from "@mui/icons-material";
import SidebarContent, { SidebarContentProps } from "./sidebarContent";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";

const drawerWidth = 280;

const Sidebar = ({ data }: { data: SidebarContentProps[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useIsSmallScreen();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const pageByIndex = {
    "/products": 0,
    "/suppliers": 1,
    "/movements": 2,
    "/metrics": 3,
  };

  const pageActive = usePathname().toString();

  const [selectedIndex, setSelectedIndex] = useState(
    pageByIndex[pageActive as keyof typeof pageByIndex]
  );

  const handleListItemClick = (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box>
      {isSmallScreen && (
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#181A1B",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ paddingLeft: 4, color: "#fff" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? isOpen : true}
        onClose={toggleDrawer}
        sx={{
          display: isSmallScreen ? "block" : "block",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#181A1B",
          },
        }}
      >
        <SidebarContent
          selectedIndex={selectedIndex}
          handleListItemClick={handleListItemClick}
          toggleDrawer={toggleDrawer}
          data={data}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          marginLeft: isSmallScreen ? 0 : `${drawerWidth}px`,
          transition: "margin-left 0.3s ease",
        }}
      ></Box>
    </Box>
  );
};

export default Sidebar;
