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
} from "@mui/material";
import { LogoutOutlined as LogoutOutlinedIcon } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { UserButton, useUser, useAuth } from "@clerk/nextjs";

export interface SidebarContentProps {
  path: string;
  text: string;
  icon: React.ReactNode;
}

export default function SidebarContent({
  data,
}: {
  data: SidebarContentProps[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { user } = useUser(); // Fetch user data from Clerk
  const { signOut } = useAuth(); // Fetch signOut function from Clerk

  const handleListItemClick = (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const colorSelector = (index: number) =>
    selectedIndex === index ? "#fff" : "#4E4D48";

  return (
    <div className="flex flex-col h-full">
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        p={2}
        mb={2}
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
          <Typography variant="body2" color="#4E4D48">
            {user?.emailAddresses[0]?.emailAddress}
          </Typography>
        </Box>
      </Box>
      <List>
        {data.map((item, index) => (
          <ListItem className="px-8" key={index}>
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
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem className="px-8">
          <ListItemButton
            onClick={() => signOut()}
            sx={{
              bgcolor: selectedIndex === 4 ? "#02494D" : "inherit",
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
    </div>
  );
}
