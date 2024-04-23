// companies.spec.js

describe("Companies Page", () => {
  it("should render companies page with the correct elements", () => {
    // Visit the companies page
    cy.visit("http://0.0.0.0/companies");

    // Verify the heading
    cy.get("h1").should("have.text", "Empresas");



    // Verify the presence of company cards
    cy.get(".MuiCard-root").should("have.length.greaterThan", 0);

    // You can add more specific assertions based on your UI
    // For example, checking the content of a specific company card

    // You may also want to add assertions for the URL if you use client-side routing
    cy.url().should("include", "/companies");
  });
});
