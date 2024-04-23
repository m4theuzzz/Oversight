import React from "react";
import Heading from "../../components/Heading";
import { Grid } from "@mui/material";
import ServiceCard from "../../components/ServiceCard";
import { useGetServices } from "../../api/services";

const Services = () => {
  const { data } = useGetServices();

  const services = data?.data?.data ?? [];

  return (
    <>
      <Heading title="Serviços" />
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
