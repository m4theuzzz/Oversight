import React from "react";
import Heading from "../../../components/Heading";
import SubHeading from "../../../components/Subheading";
import { Chip, Divider, Grid } from "@mui/material";
import CardWrapper from "../../../components/CardWrapper";
import Text from "../../../components/Text";
import ServiceCard from "../../../components/ServiceCard";

const BudgetPage = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
        >
          <Heading title="Orçamento" subtitle="Orçamento Samara" />
          <Chip label="Em Aberto" color="success" />
        </Grid>
        <Grid item xs={12}>
          <SubHeading title="Dados Básicos" />
        </Grid>

        <Grid item xs={12} md={8}>
          <CardWrapper>
            <Text variant="caption" sx={{ fontWeight: 700 }}>
              Cliente
            </Text>
            <Text variant="body1" sx={{ mb: 1 }}>
              Samara
            </Text>

            <Text variant="caption" sx={{ fontWeight: 700 }}>
              Descrição
            </Text>
            <Text variant="body1">Predio muito top da samara</Text>
          </CardWrapper>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ m: 0 }} />
        </Grid>
        <Grid item xs={12}>
          <SubHeading title="Serviços" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard />
        </Grid>
      </Grid>
    </>
  );
};

export default BudgetPage;
