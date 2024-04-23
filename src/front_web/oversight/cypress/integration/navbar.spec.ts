describe('NavBar Component', () => {
    beforeEach(() => {
      // Visit the page or component URL before each test
      cy.visit('/');
    });
  
    it('renders the NavBar component', () => {
      // Check if the NavBar component is visible
      cy.get('[data-testid=navbar]').should('be.visible');
  
      // You can add more assertions based on your component structure and behavior
      // For example, check if specific links or buttons are present
      cy.get('[data-testid=budgets-link]').should('be.visible');
      cy.get('[data-testid=services-link]').should('be.visible');
      cy.get('[data-testid=companies-link]').should('be.visible');
    });
  
    it('navigates to the Budgets page', () => {
      // Click on the Budgets link
      cy.get('[data-testid=budgets-link]').click();
  
      // Check if the URL has changed to the Budgets page
      cy.url().should('include', '/budgets');
  
      // You can add more assertions based on the behavior of your application
    });
  
    it('logs out the user', () => {
      // Click on the logout button
      cy.get('[data-testid=logout-button]').click();
  
      // You can add more assertions based on the behavior of your application
    });
  });