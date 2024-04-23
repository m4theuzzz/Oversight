import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Text from "./Text";

type CardWrapperProps = {
  children: React.ReactNode;
};
const CardWrapper = ({ children, ...props }: CardWrapperProps) => {
  return (
    <Box
      sx={{
        padding: 2,

        borderRadius: 3,
        backgroundColor: "background.paper",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default CardWrapper;
