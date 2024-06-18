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
  useGetCompany,
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
  customerId: "",
  name: "",
  description: "",
  incomingMargin: 15,
  status: "budgeting",
};

const BudgetForm = () => {
  const { query } = useRouter();
  const { budgetId } = query;
  const isEdit = !!budgetId;

  const { data } = useGetBudget(budgetId);
  console.log("%cXABLAUdssd", "color: red", data?.data.data);

  const budgetData = data?.data.data ?? defaultValues;

  const budgetForm = useForm({
    defaultValues: budgetData,
  });
  const { control, handleSubmit, reset, watch } = budgetForm;

  useEffect(() => {
    reset({ ...budgetData });
  }, [budgetData]);

  const { addBudget, editBudget, isLoading } = useBudgetMutation();

  const submitBudget = (data) => {
    isEdit ? editBudget(data, budgetId) : addBudget(data);
  };

  return (
    <>
      <FormProvider {...budgetForm}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Heading title={(isEdit ? "Editar" : "Novo") + " orçamento"} />
        </Box>
        <Card sx={{ mt: 4, width: "70%" }}>
          <CardContent>
            <form onSubmit={handleSubmit(submitBudget)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <DropdownAsyncRHF
                    asyncProps={{
                      endpoint: appRoutes.costumers,
                      valueTag: "id",
                      // dataTag: 'paymentMethods',
                      getOptionLabelKey: "name",
                      isOptionEqualToValueKey: "id",
                    }}
                    control={control}
                    name={"customerId"}
                    label="Cliente"
                    required
                  />
                  {/* <TextInput name="name" label="Nome" control={control} /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInput name="name" label="Nome" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextInput
                    name="description"
                    label="Descrição"
                    control={control}
                  />
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

export default BudgetForm;
