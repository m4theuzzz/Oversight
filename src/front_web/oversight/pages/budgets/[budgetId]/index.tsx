import React from "react";
import Heading from "../../../components/Heading";
import SubHeading from "../../../components/Subheading";
import { Chip, Divider, Grid, Box, Button } from "@mui/material";
import CardWrapper from "../../../components/CardWrapper";
import Text from "../../../components/Text";
import { useRouter } from "next/router";
import { useGetBudget } from "../../../api/budgets";
import BudgetServices from "../../../components/BudgetServices";
import { budgetStatusToLabel } from "../../../components/BudgetCard";
import Link from "next/link";
import useModal from "../../../hooks/useModal";
import SimpleModal from "../../../components/SimpleModal";
import ServiceToBudgetForm from "../../../components/ServiceToBudgetForm";

const BudgetPage = () => {
  const { query } = useRouter();
  const { budgetId } = query;
  const addServiceModal = useModal();

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
            <Box sx={{ display: "flex", gap: 4 }}>
              <Chip
                label={budgetStatusToLabel[budget.status]}
                color="success"
              />
              <Link href={`/budgets/${budgetId}/edit`}>
                <Button>Editar</Button>
              </Link>
            </Box>
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
          <SimpleModal
            open={addServiceModal.isOpen}
            close={addServiceModal.close}
            title="Novo Serviço"
          >
            <ServiceToBudgetForm
              budgetId={budgetId}
              callback={addServiceModal.close}
            />
          </SimpleModal>

          <Grid item xs={12}>
            <Divider sx={{ m: 0 }} />
          </Grid>
          <Grid item xs={12}>
            <SubHeading title="Serviços" />
            <Button onClick={addServiceModal.open}>Adicionar serviço</Button>
          </Grid>
          <BudgetServices budgetId={budgetId} />
        </Grid>
      )}
    </>
  );
};

export default BudgetPage;
