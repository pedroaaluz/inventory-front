"use client";
import { Typography, Box } from "@mui/material";
import { useParams } from "next/navigation";

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
