import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

interface AlertDialogCostoUnitarioProps {
  open: boolean;
  costo: string;
  handleClose: () => void;
  handleAgree: () => void;
}

export default function AlertDialogCostoUnitario({
  open,
  costo,
  handleClose,
  handleAgree,
}: AlertDialogCostoUnitarioProps) {

  const [inputValue, setInputValue] = useState(costo);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edita el costo unitaro base de este periodo"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Costo unitario base"
            variant="standard"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAgree} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
