export const base = process.env.NEXT_PUBLIC_API_ENDPOINT || "localhost:3000";

export const appRoutes = {
  budgets: "/budgets",
  budgetById: "/budgets/:budgetId",
  services: "/services",
  serviceById: "/services/:serviceId",
  budgetServices: "/budgets/:budgetId/services",
  login: "/login",
  companies: "/companies",
  companyById: "/companies/:companyId",
  costumers: "/customers",
  costumerById: "/customers/:companyId",
};
