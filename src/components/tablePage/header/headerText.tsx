import { Typography } from "@mui/material";

export default function HeaderText({ text }: { text: string }) {
  return (
    <Typography marginTop={10} color={"#00585e"} variant="h4">
      {text}
    </Typography>
  );
}
