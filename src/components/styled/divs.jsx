import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";


export const ParentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "auto",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const ChildBox = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "16px",
});


export const SectionBox = styled(Box)({
    padding: "16px",
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: "4px",
    overflow: "auto",
});

export const TaskCard = styled(Box)({
    marginBottom: "16px",
    padding: "8px",
    backgroundColor: "lightgrey",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  });

