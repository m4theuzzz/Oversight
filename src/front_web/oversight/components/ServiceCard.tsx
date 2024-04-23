import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Text from "./Text";

type ListCardProps = {
  title: string;
  subtitle: string;
  rightText: string;
};
const ServiceCard = ({ name, description, value }: ListCardProps) => {

  console.log('%cXABLAU','color: blue',name );
  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        gap: 8,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Box>
        <Text variant="h6">{name}</Text>
        <Text variant="body2">{description}</Text>
      </Box>
      <Text variant="h6">R${value}</Text>
    </Box>
  );
};

export default ServiceCard;
