import React from "react";
import Heading from "../../../components/Heading";
import SubHeading from "../../../components/Subheading";
import { Chip, Divider, Grid } from "@mui/material";
import CardWrapper from "../../../components/CardWrapper";
import Text from "../../../components/Text";
import { useRouter } from "next/router";
import { useGetBudget } from "../../../api/budgets";
import BudgetServices from "../../../components/BudgetServices";
import { budgetStatusToLabel } from "../../../components/BudgetCard";

const BudgetPage = () => {
  const { query } = useRouter();
  const { budgetId } = query;

  const { data, isLoading } = useGetBudget(budgetId);

  const budget = data?.data?.data ?? {};

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
          >
            <Heading title="Orçamento" subtitle={budget.name} />
            <Chip label={budgetStatusToLabel[budget.status]} color="success" />
          </Grid>
          <Grid item xs={12}>
            <SubHeading title="Dados Básicos" />
          </Grid>

          <Grid item xs={12} md={8}>
            <CardWrapper>
              {/* <Text variant="caption" sx={{ fontWeight: 700 }}>
                Cliente
              </Text>
              <Text variant="body1" sx={{ mb: 1 }}>
                Samara
              </Text> */}

              <Text variant="caption" sx={{ fontWeight: 700 }}>
                Descrição
              </Text>
              <Text variant="body1">{budget.description}</Text>
            </CardWrapper>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ m: 0 }} />
          </Grid>
          <Grid item xs={12}>
            <SubHeading title="Serviços" />
          </Grid>
          <BudgetServices budgetId={budgetId} />
        </Grid>
      )}
    </>
  );
};

export default BudgetPage;
