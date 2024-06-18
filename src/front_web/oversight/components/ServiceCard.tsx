import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import React from "react";
import Text from "./Text";
import Link from "next/link";
import { useServiceMutations } from "../api/companies";

type ListCardProps = {
  title: string;
  subtitle: string;
  rightText: string;
};
const ServiceCard = ({ name, description, value, id }: ListCardProps) => {
  console.log("%cXABLAU", "color: blue", name);

  const { deleteService } = useServiceMutations();
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
        <Text variant="h6">
          {name}{" "}
          <Link href={`/services/${id}/edit`}>
            <Button size="small">Editar</Button>
          </Link>
          <Button size="small" color="error" onClick={() => deleteService(id)}>
            Excluir
          </Button>
        </Text>
        <Text variant="body2">{description}</Text>
      </Box>

      <Text variant="h6">R${value}</Text>
    </Box>
  );
};

export default ServiceCard;
