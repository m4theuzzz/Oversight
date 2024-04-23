import React from "react";
import Heading from "../../components/Heading";
import { Alert, Grid, Typography } from "@mui/material";
import ServiceCard from "../../components/ServiceCard";
import BudgetCard from "../../components/BudgetCard";
import { useGetBudgets } from "../../api/budgets";

const Budgets = () => {
  const { data } = useGetBudgets();

  const budgets = data?.data?.data ?? [];

  return (
    <>
      <Heading title="Orçamentos" />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {budgets.map((budget) => (
          <Grid key={budget.id} item xs={12}>
            <BudgetCard {...budget} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Budgets;
