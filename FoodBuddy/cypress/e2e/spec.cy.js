describe('check to see if website is up', () => {
  it('webapp is running', () => {
    cy.visit('http://localhost:5173')
    // expect(true).to.equal(true)
  })
})


describe('FoodForm', () => {
  beforeEach(() => {
    cy.loginToAuth0();
    cy.visit('http://localhost:5173/foodinfo');
  });

  it('should display the food search input and button', () => {
    cy.get('[data-cy="food-input"]').should('be.visible');
    cy.get('[data-cy="food-search-button"]').should('be.visible');
  });

  it('should update the input value when typing', () => {
    cy.get('[data-cy="food-input"]').type('apple').should('have.value', 'apple');
  });

  it('should trigger search on button click', () => {
    cy.get('[data-cy="food-input"]').type('apple');
    cy.get('[data-cy="food-search-button"]').click();
    cy.get('[data-cy="food-search-button"]').should('be.disabled');
  });

  it('should display search results', () => {
    cy.get('[data-cy="food-input"]').type('apple');
    cy.get('[data-cy="food-search-button"]').click();
    cy.get('.card-list').should('be.visible'); 
  });

  it('should handle pagination', () => {
    cy.get('[data-cy="food-input"]').type('apple');
    cy.get('[data-cy="food-search-button"]').click();
    cy.get('.pagination').should('be.visible');
    cy.get('.pagination').contains('2').click();
    cy.get('.card-list').should('be.visible');
  });

  it('should display error message for empty input', () => {
    cy.get('[data-cy="food-search-button"]').click();
    cy.get('.MuiFormHelperText-root').should('contain', 'Field cannot be empty');
  });

  it('should display NoFoodFound component for invalid search', () => {
    cy.get('[data-cy="food-input"]').type('invalidfoodterm');
    cy.get('[data-cy="food-search-button"]').click();
    cy.get('.no-food-found').should('be.visible');
  });
});