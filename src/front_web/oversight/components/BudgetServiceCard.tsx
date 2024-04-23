import { Box } from "@mui/material";
import React from "react";
import Text from "./Text";

const BudgetServiceCard = ({ budgetedUnitValue, service, quantity }) => {
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
        <Text variant="h6">{service?.name}</Text>
        
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Text variant="h6">R${budgetedUnitValue}</Text>
        <Text>{quantity} unidades</Text>
      </Box>
    </Box>
  );
};

export default BudgetServiceCard;
