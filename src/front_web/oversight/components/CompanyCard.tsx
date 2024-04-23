import React from "react";
import CardWrapper from "./CardWrapper";
import { Box, Chip, IconButton } from "@mui/material";
import Text from "./Text";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCompanyMutations } from "../api/companies";

const CompanyCard = ({ name, email, cnpj, id }) => {
  const router = useRouter();
  const { deleteCompany } = useCompanyMutations();

  const handleDeleteCompany = (e) => {
    console.log('%cXABLAU','color: blue',e );
    e.stopPropagation()
    deleteCompany(id);
  };

  return (
    <CardWrapper onClick={() => router.push(`/companies/${id}/edit`)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Box>
          <Box>
            <Text variant="h6">{name}</Text>
            <Text variant="body2">
              <strong>CNPJ:</strong> {cnpj} / <strong>email:</strong> {email}
            </Text>
          </Box>
        </Box>
        <IconButton onClick={handleDeleteCompany} sx={{ ml: 2 }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </CardWrapper>
  );
};

export default CompanyCard;
