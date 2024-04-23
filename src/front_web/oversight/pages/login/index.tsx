import { Box, Typography, styled } from "@mui/material";
import React from "react";
import LoginPage from "../../components/LoginPage";

const index = () => {
  return<LoginPage/>;
};

export default index;

const LoginBoxWrapper = styled(Box)(({ theme }) => ({
  width: 300,
  backgroundColor: theme.palette.background.paper,
  padding: 15,
  height: '100%',
  borderRadius: 15
}));
