// src/components/LoginRequiredDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginRequiredDialog({ open, onClose, onLogin }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "18px",
          padding: "10px",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: "1.4rem",
          background: "linear-gradient(90deg,#1e3c72,#2a5298)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🔐 Login Required
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "1rem", mb: 2, color: "#555" }}>
          Please login first to discover your personalized career roadmap.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          onClick={onLogin}
          startIcon={<LoginIcon />}
          sx={{
            px: 3,
            borderRadius: "20px",
            background: "linear-gradient(90deg,#1e3c72,#2a5298)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(90deg,#16315f,#244a86)",
            },
          }}
        >
          Login
        </Button>
        <Button variant="text" onClick={onClose} sx={{ color: "#444" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
