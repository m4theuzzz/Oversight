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
import {
  useBudgetMutation,
  useCompanyMutations,
  useGetCompany,
  useGetService,
  useServiceMutations,
} from "../api/companies";
import { useRouter } from "next/router";
import { joiResolver } from "../utils/resolver";
import { companySchema } from "../utils/companyValidation";
import DropdownAsyncRHF from "./DropdownAsyncRHF";
import { appRoutes } from "../routes";

const defaultValues = {
  serviceId: "",
  quantity: 0,
  budgetedUnitValue: 0,
};

const ServiceToBudgetForm = ({ budgetId, callback }) => {
  const ServiceToBudgetForm = useForm({
    defaultValues: defaultValues,
  });
  const { control, handleSubmit, reset } = ServiceToBudgetForm;

  const { addServiceToBudget } = useBudgetMutation();

  const submitService = (data) => {
    addServiceToBudget({ ...data, budgetId: budgetId, callback });
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitService)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DropdownAsyncRHF
              asyncProps={{
                endpoint: appRoutes.services,
                valueTag: "id",
                // dataTag: 'paymentMethods',
                getOptionLabelKey: "name",
                isOptionEqualToValueKey: "id",
              }}
              control={control}
              name={"serviceId"}
              label="Serviço"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextInput name="quantity" label="Quantidade" control={control} />
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
    </>
  );
};

export default ServiceToBudgetForm;
