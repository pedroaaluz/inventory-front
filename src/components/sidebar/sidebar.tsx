"use client";

import React, { useState } from "react";
import { Drawer, IconButton, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import SidebarContent, { SidebarContentProps } from "./sidebarContent";

const Sidebar = ({ data }: { data: SidebarContentProps[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const drawerWidth = 340;

  return (
    <Box
      sx={{
        width: { sm: drawerWidth },
        flexShrink: 0,
      }}
    >
      {/* SidebarMobile */}
      {!isOpen && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{
            display: { sm: "none" },
            paddingLeft: 4,
            position: "fixed",
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#181A1B",
          },
        }}
      >
        <SidebarContent data={data} />
      </Drawer>

      {/* SidebarDesktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#181A1B",
          },
        }}
        open
      >
        <SidebarContent data={data} />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
