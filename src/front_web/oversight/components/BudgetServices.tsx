import React from "react";
import { useGetBudgetServices } from "../api/budgets";
import { Alert, Grid } from "@mui/material";
import BudgetServiceCard from "./BudgetServiceCard";

const BudgetServices = ({ budgetId }) => {
  const { data, isLoading } = useGetBudgetServices(budgetId);

  const services = data?.data?.data ?? [];

  return isLoading ? (
    ""
  ) : services.length ? (
    services.map((service) => (
      <Grid item xs={12} md={6}>
        <BudgetServiceCard {...service} />
      </Grid>
    ))
  ) : (
    <Grid item xs={12} md={6}>
      <Alert severity="info">Ainda não há serviços</Alert>
    </Grid>
  );
};

export default BudgetServices;
