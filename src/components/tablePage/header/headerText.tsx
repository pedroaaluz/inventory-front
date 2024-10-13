import { Typography } from "@mui/material";

export default function HeaderText({ text }: { text: string }) {
  return (
    <Typography color={"#00585e"} variant="h4">
      {text}
    </Typography>
  );
}
