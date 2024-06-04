describe('check to see if website is up', () => {
  it('webapp is running', () => {
    cy.visit('http://localhost:5173')
    // expect(true).to.equal(true)
  })
})

describe('FoodForm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/foodinfo');
  });

  it('renders the form correctly', () => {
    cy.get('form').should('exist');
    cy.get('input#food').should('exist');
    cy.get('button').contains('Fetch Food').should('exist');
  });

  it('handles input and fetches data', () => {
    cy.get('input#food').type('apple');
    cy.get('button').contains('Fetch Food').click();
    
  });

  it('displays the response correctly', () => {
    cy.get('[data-cy=food-input]').type("apple");
    cy.get('[data-cy=food-search-button]').click();
    cy.wait('@getFood');
    cy.get('[data-cy=food-card-0]').contains("apple");
  });
});