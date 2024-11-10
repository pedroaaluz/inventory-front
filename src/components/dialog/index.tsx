import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useIsSmallScreen } from "@/hooks/isSmallScreen";

export default function ResponsiveDialog({
  dialogTitle,
  dialogContentText,
  dialogActions,
  states,
  actionConfirm,
}: {
  dialogTitle: string;
  dialogContentText: string;
  dialogActions: { cancel: string; confirm: string };
  states: {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
  actionConfirm: (param?: any) => void;
}) {
  const isSmallScreen = useIsSmallScreen();
  const fullScreen = isSmallScreen;

  const handleClose = () => {
    states.setVisible(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={states.visible}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {dialogActions.cancel}
          </Button>
          <Button
            onClick={() => {
              handleClose();
              actionConfirm();
            }}
            autoFocus
          >
            {dialogActions.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
