import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

export default function EntityDetailsList({
  isLoading,
  listItems,
}: {
  isLoading: boolean;
  listItems: { name: string; value?: string | number; icon: JSX.Element }[];
}) {
  return (
    <List sx={{ maxWidth: 360 }}>
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" width="100%" height={56} />
          <Skeleton variant="rectangular" width="100%" height={56} />
          <Skeleton variant="rectangular" width="100%" height={56} />
        </>
      ) : (
        <>
          {listItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#00585e",
                      borderRadius: "50%",
                      padding: "8px",
                    }}
                  >
                    {item.icon}
                  </Box>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  color: "#00585e",
                }}
                primary={item.name}
                secondaryTypographyProps={{
                  color: "#000",
                  maxWidth: 100,
                }}
                secondary={item.value}
              />
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
}
