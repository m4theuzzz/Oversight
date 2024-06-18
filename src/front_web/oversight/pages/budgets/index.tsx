import React from "react";
import Heading from "../../components/Heading";
import { Alert, Grid, Typography, Box, Button } from "@mui/material";
import ServiceCard from "../../components/ServiceCard";
import BudgetCard from "../../components/BudgetCard";
import { useGetBudgets } from "../../api/budgets";
import Link from "next/link";

const Budgets = () => {
  const { data } = useGetBudgets();

  const budgets = data?.data?.data ?? [];

  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Heading title="Orçamentos" />
        <Link href="budgets/new">
          <Button>Novo orçamento</Button>
        </Link>
      </Box>
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
