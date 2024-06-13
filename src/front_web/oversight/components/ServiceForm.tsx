import React, { useEffect } from "react";
import Heading from "./Heading";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { useCompanyMutations, useGetCompany } from "../api/companies";
import { useRouter } from "next/router";
import { joiResolver } from "../utils/resolver";
import { companySchema } from "../utils/companyValidation";

const defaultValues = {
  email: "",
  name: "",
  cnpj: "",
  phone: "",
};

const ServiceForm = () => {
  const { query } = useRouter();
  const { serviceId } = query;
  const isEdit = !!serviceId;

  const { data } = useGetService(serviceId);
  const companyData = data?.data.data ?? defaultValues;

  const ServiceForm = useForm({
    defaultValues: companyData
  });
  const { control, handleSubmit, reset } = ServiceForm;

  useEffect(() => {
    reset({ ...companyData });
  }, [companyData]);

  const { addCompany, editCompany, isLoading } = useCompanyMutations();

  const submitCompany = (data) => {
    isEdit ? editCompany(data, companyId) : addCompany(data);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Heading title={isEdit ? "Editar" : "Nova" + " empresa"} />
      </Box>
      <Card sx={{ mt: 4, width: "70%" }}>
        <CardContent>
          <form onSubmit={handleSubmit(submitCompany)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextInput name="name" label="Nome" control={control} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput name="email" label="Email" control={control} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput name="phone" label="Telefone" control={control} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput name="cnpj" label="CNPJ" control={control} />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button type="submit">SALVAR</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceForm;
