import React from "react";
import Heading from "../../components/Heading";
import { Grid, Button, Box } from "@mui/material";
import ServiceCard from "../../components/ServiceCard";
import { useGetServices } from "../../api/services";
import Link from "next/link";

const Services = () => {
  const { data } = useGetServices();

  const services = data?.data?.data ?? [];

  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Heading title="Serviços" />
        <Link href="services/new">
          <Button>Novo serviço</Button>
        </Link>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {services.map((service) => (
          <Grid item xs={12} md={6} key={service.id}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Services;
