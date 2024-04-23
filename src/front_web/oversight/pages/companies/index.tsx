import React, { useEffect } from "react";
import Heading from "../../components/Heading";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import ServiceCard from "../../components/ServiceCard";
import BudgetCard from "../../components/BudgetCard";
import { useGetBudgets } from "../../api/budgets";
import Link from "next/link";
import CompanyCard from "../../components/CompanyCard";
import { useGetCompanies } from "../../api/companies";
import { useAuth } from "../../hooks/useAuth";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const Companies = () => {
  const { data } = useGetCompanies();
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    user.role != "master" &&
      router.replace({
        pathname: "/budgets",
      });
  }, []);

  const companies = data?.data?.data ?? [];

  console.log('%cXABLAU','color: blue', companies);


  return (
    <>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Heading title="Empresas" />
        <Link href="/companies/new">
          <Button>Nova Empresa</Button>
        </Link>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {companies.map((company) => (
          <Grid key={company.id} item xs={6} hidden={company.name === 'Oversight'}>
            <CompanyCard {...company} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Companies;
