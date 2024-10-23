import { Card, CardContent, CardMedia, TextField } from "@mui/material";
import { toast } from "sonner";
import addPhoto from "@/assets/addPhoto.png";

export default function DescriptionCard({
  isMobile,
  avatarImage,
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onAvatarImageChange,
}: {
  isMobile: boolean;
  avatarImage?: string;
  name?: string;
  description?: string;
  onNameChange: (newName: string) => void;
  onDescriptionChange?: (newDescription: string) => void;
  onAvatarImageChange: (newImage: string) => void;
}) {
  const handleAvatarClick = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/png, image/jpeg, image/jpg";

    inputElement.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileType = file.type;

        if (fileType === "image/png" || fileType === "image/jpeg") {
          const reader = new FileReader();
          reader.onloadend = () => {
            onAvatarImageChange(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          toast.error("Por favor, selecione um arquivo PNG ou JPG.");
        }
      }
    };

    inputElement.click();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        border: "none",
      }}
    >
      <CardMedia
        component="img"
        sx={
          isMobile
            ? {
                width: "100%",
                height: 250,
              }
            : {
                width: 180,
                height: 180,
                borderRadius: "50%",
                marginRight: 2,
                cursor: "pointer",
              }
        }
        src={avatarImage || addPhoto.src}
        alt="entity edit image"
        onClick={handleAvatarClick}
      />
      <CardContent sx={{ textAlign: isMobile ? "center" : "left" }}>
        <TextField
          value={name}
          onChange={(e) => {
            onNameChange(e.target.value);
          }}
          label="Nome"
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{
            "& .MuiInputLabel-root": {
              color: "#00585e",
              "&.Mui-focused": {
                color: "#00585e",
              },
            },
            "& .MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00585e",
                borderWidth: "2px",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00585e",
                  borderWidth: "3px",
                },
              },
            },
          }}
        />
        {onDescriptionChange && (
          <TextField
            value={description}
            onChange={(e) => {
              onDescriptionChange(e.target.value);
            }}
            label="Descrição"
            fullWidth
            variant="outlined"
            margin="normal"
            type="text"
            multiline
            rows={4}
            sx={{
              "& .MuiInputLabel-root": {
                color: "#00585e",
                "&.Mui-focused": {
                  color: "#00585e",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00585e",
                  borderWidth: "2px",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00585e",
                    borderWidth: "3px",
                  },
                },
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
