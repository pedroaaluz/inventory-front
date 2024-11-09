"use client";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { LogoutOutlined as LogoutOutlinedIcon } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { useUser, useAuth } from "@clerk/nextjs";
import { Close } from "@mui/icons-material";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";

export interface SidebarContentProps {
  path: string;
  text: string;
  icon: React.ReactNode;
}

export default function SidebarContent({
  data,
  toggleDrawer,
  handleListItemClick,
  selectedIndex,
}: {
  data: SidebarContentProps[];
  toggleDrawer: () => void;
  handleListItemClick: (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
  selectedIndex: number;
}) {
  const colorSelector = (index: number) =>
    selectedIndex === index ? "#fff" : "#4E4D48";

  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <Box flexDirection="column" height="100%" width="100%">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingY={2}
        mb={2}
        sx={{
          cursor: "pointer",
          backgroundColor: "#212425",
          borderBottom: 1,
          borderBottomRightRadius: 14,
          borderBottomLeftRadius: 14,
          "&:hover": {
            bgcolor: "#313232",
          },
          width: "100%",
        }}
      >
        <Avatar
          sx={{
            width: 70,
            height: 70,
          }}
          src={user?.imageUrl}
          alt={user?.username!}
        />
        <Box ml={4}>
          <Typography fontSize={20} variant="body1" color="#FFFFFF">
            {user?.username}
          </Typography>
          <Typography fontSize={16} variant="body2" color="#4E4D48">
            {user?.emailAddresses[0]?.emailAddress}
          </Typography>
        </Box>
        {useIsSmallScreen() && (
          <IconButton onClick={toggleDrawer} style={{ color: "#FFF" }}>
            <Close />
          </IconButton>
        )}
      </Box>
      <List>
        {data.map((item, index) => (
          <ListItem key={index} sx={{ paddingX: 2 }}>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              sx={{
                bgcolor: selectedIndex === index ? "#02494D" : "inherit",
                "&.Mui-selected": {
                  bgcolor: "#02494D",
                  "&:hover": {
                    bgcolor: "#00585e",
                  },
                },
                borderRadius: "14px",
              }}
            >
              <ListItemIcon
                sx={{
                  color: colorSelector(index),
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: colorSelector(index),
                  fontSize: 24,
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={{ width: "100%", paddingX: 2 }}>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => {
              handleListItemClick(event, 4);
              signOut();
            }}
            sx={{
              bgcolor: selectedIndex === 4 ? "#02494D" : "inherit",
              "&.Mui-selected": {
                bgcolor: "#910F2E",
                "&:hover": {
                  bgcolor: "#8C3F52",
                },
              },
              borderRadius: "14px",
              width: "100%",
            }}
          >
            <ListItemIcon
              sx={{
                color: colorSelector(4),
              }}
            >
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              sx={{
                color: colorSelector(4),
              }}
              primary="Deslogar"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
