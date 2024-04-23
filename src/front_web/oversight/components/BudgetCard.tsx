import React from "react";
import CardWrapper from "./CardWrapper";
import { Box, Chip } from "@mui/material";
import Text from "./Text";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useRouter } from "next/router";

const BudgetCard = ({ description, name, status, id }) => {

  const router = useRouter()

  return (
    <CardWrapper onClick={()=>router.push(`/budgets/${id}/`)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: 'pointer'
        }}
      >
        <Box>
          <Box>
            <Text variant="h6">{name}</Text>
            <Text variant="body2">{description}</Text>
          </Box>
          <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
            <Chip label={budgetStatusToLabel[status]} color="success" size="small" />
            <Box sx={{ display: "flex", gap: 1 }}>
              <HandymanIcon fontSize="small" color="primary" />
              {/* <Text component="span" variant="caption">
                Servico, banana, xablau, +2
              </Text> */}
            </Box>
          </Box>
        </Box>
        <Text variant="h5" sx={{ mr: 2 }}>
          {/* R$22 */}
        </Text>
      </Box>
    </CardWrapper>
  );
};

export default BudgetCard;

export const budgetStatusToLabel = {
  budgeting: 'Em Aberto',

   awaiting: 'Aguardando',
   approved: 'Aprovado',
   denied: 'Negado',
   executing: 'Executando',
   done: 'Pronto'
}