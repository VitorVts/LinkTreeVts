import { SxProps, Theme } from "@mui/material/styles";

export const linkButtonStyles: SxProps<Theme> = {
  backgroundColor: "#f1f5fb",
  color: "#000000",
  borderRadius: "15px",
  padding: "10px",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "20px",
  justifyContent: "center",
  width: "100%",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#d1d5db",
  },
};