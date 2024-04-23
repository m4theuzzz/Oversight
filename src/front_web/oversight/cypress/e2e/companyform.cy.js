// cypress/integration/companyForm.spec.js

describe("CompanyForm", () => {
  beforeEach(() => {
    // You may want to visit your page or route before each test
    cy.visit("http://0.0.0.0/companies/new");
  });

  it("should submit the form with valid data", () => {
    // Fill in form fields with valid data
    cy.get('input[name="name"]').type("Empresa Teste");
    cy.get('input[name="email"]').type("empresa@example.com");
    cy.get('input[name="phone"]').type("31 9999 9999");
    cy.get('input[name="cnpj"]').type("12345678901234");

    // Submit the form
    cy.get("form").submit();

    // Assuming there is a success message or redirect, you can assert it
    cy.url().should("include", "/companies");
  });
});
