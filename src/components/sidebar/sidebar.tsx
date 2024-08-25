"use client";

import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const drawerWidth = 240;

  return (
    <Box sx={{ width: { sm: drawerWidth }, flexShrink: 0 }}>
      {!isOpen && ( // Renderiza o MenuIcon apenas quando isOpen é false
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{
            display: { sm: "none" }, // Esconde o botão em telas maiores
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
          display: { xs: "block", sm: "none" }, // Mostra o drawer somente em telas menores
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <SidebarContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" }, // Mostra o drawer fixo em telas maiores
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
};

const SidebarContent = () => (
  <div>
    <List>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </List>
  </div>
);

export default Sidebar;
