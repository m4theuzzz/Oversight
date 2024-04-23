import React from "react";
import Heading from "../../components/Heading";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import ServiceCard from "../../components/ServiceCard";
import BudgetCard from "../../components/BudgetCard";
import { useGetBudgets } from "../../api/budgets";
import Link from "next/link";
import CompanyCard from "../../components/CompanyCard";
import { useGetCompanies } from "../../api/companies";
import { useGetCostumers } from "../../api/costumers";
import CostumerCard from "../../components/CostumerCard";

const Costumers = () => {
  const { data } = useGetCostumers();

  const costumers = data?.data?.data ?? [];

  console.log('%cXABLAU','color: blue',costumers );

  return (
    <>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Heading title="Clientes" />
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {costumers.map((costumer) => (
          <Grid key={costumer.id} item xs={6}>
            <CostumerCard {...costumer} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Costumers;
