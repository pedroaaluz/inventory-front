"use client";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  CardMedia,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Skeleton,
  SelectChangeEvent,
  Box,
  ListItemButton,
  Button,
} from "@mui/material";
import {
  LocalOffer as LocalOfferIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationOnIcon,
  Campaign as CampaignIcon,
  AccessTime as AccessTimeIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { IGetProductOutput } from "../../../../../types/products";
import type { IListMovementOutput } from "../../../../../types/movements";
import ResponsiveTable from "@/components/responsiveTable";
import HeaderSearchBar from "@/components/tablePage/header/headerSearchBar";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { handleQueryParams } from "@/utils/handleQueryParams";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id}
      </Typography>
    </Box>
  );
}
