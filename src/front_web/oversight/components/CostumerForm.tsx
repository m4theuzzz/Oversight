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

import { useForm, FormProvider } from "react-hook-form";
import TextInput from "./TextInput";
import {
  useBudgetMutation,
  useCompanyMutations,
  useCostumerMutations,
  useGetCompany,
  useGetCostumer,
  useGetService,
  useServiceMutations,
} from "../api/companies";
import { useRouter } from "next/router";
import { joiResolver } from "../utils/resolver";
import { companySchema } from "../utils/companyValidation";
import { useGetBudget } from "../api/budgets";
import DropdownAsyncRHF from "./DropdownAsyncRHF";
import { appRoutes } from "../routes";

const defaultValues = {
  name: "",
  email: "",

  phone: "",
};

const CostumerForm = () => {
  const { query } = useRouter();
  const { costumerId } = query;
  const isEdit = !!costumerId;

  const { data } = useGetCostumer(costumerId);
  console.log("%cXABLAUdssd", "color: red", data?.data.data);

  const costumerData = data?.data.data ?? defaultValues;

  const budgetForm = useForm({
    defaultValues: costumerData,
  });
  const { control, handleSubmit, reset, watch } = budgetForm;

  useEffect(() => {
    reset({ ...costumerData });
  }, [costumerData]);

  const { addCostumer, editCostumer, isLoading } = useCostumerMutations();

  const submitBudget = (data) => {
    isEdit ? editCostumer(data, costumerId) : addCostumer(data);
  };

  return (
    <>
      <FormProvider {...budgetForm}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Heading title={(isEdit ? "Editar" : "Novo") + " cliente"} />
        </Box>
        <Card sx={{ mt: 4, width: "70%" }}>
          <CardContent>
            <form onSubmit={handleSubmit(submitBudget)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextInput name="name" label="Nome" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInput name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInput name="phone" label="Telefone" control={control} />
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
      </FormProvider>
    </>
  );
};

export default CostumerForm;
