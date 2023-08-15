import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const ConfirmationDiaolog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-descibedby="alert-dialog-description"
      className="cancel-popup"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          className="btn danger-btn"
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          type="button"
          autoFocus
          variant="contained"
          className="btn green-btn"
          onClick={() => onConfirm()}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
