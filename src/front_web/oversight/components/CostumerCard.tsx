import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import React from "react";
import Text from "./Text";
import CardWrapper from "./CardWrapper";
import Link from "next/link";

type ListCardProps = {
  title: string;
  subtitle: string;
  rightText: string;
};
const CostumerCard = ({ name, email, phone, id }: ListCardProps) => {
  return (
    <CardWrapper>
      <Box>
        <Box>
          <Text variant="h6">
            {name}
            <Link href={`/costumers/${id}/edit`}>
              <Button size="small">Editar</Button>
            </Link>
            {/* <Button
              size="small"
              color="error"
              onClick={() => deleteService(id)}
            >
              Excluir
            </Button> */}
          </Text>
          <Text variant="body2">
            <strong>Telefone:</strong> {phone} / <strong>email:</strong> {email}
          </Text>
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default CostumerCard;
