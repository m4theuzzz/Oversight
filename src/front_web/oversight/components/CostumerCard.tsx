import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import Text from "./Text";
import CardWrapper from "./CardWrapper";

type ListCardProps = {
  title: string;
  subtitle: string;
  rightText: string;
};
const CostumerCard = ({ name, email, phone }: ListCardProps) => {
  return (
    <CardWrapper>
      <Box>
        <Box>
          <Text variant="h6">{name}</Text>
          <Text variant="body2">
            <strong>Telefone:</strong> {phone} / <strong>email:</strong> {email}
          </Text>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default CostumerCard;
