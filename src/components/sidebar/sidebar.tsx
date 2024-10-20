"use client";

import React, { useState } from "react";
import { Drawer, IconButton, Box } from "@mui/material";
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

  return (
    <Box sx={{ display: "flex", backgroundColor: "#181A1B" }}>
      {isSmallScreen && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{
            paddingLeft: 4,
            position: "fixed",
            color: "#fff",
          }}
        >
          <MenuIcon />
        </IconButton>
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
        <SidebarContent toggleDrawer={toggleDrawer} data={data} />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isSmallScreen ? 0 : `${drawerWidth}px`,
          transition: "margin-left 0.3s ease",
        }}
      ></Box>
    </Box>
  );
};

export default Sidebar;
