// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToAuth0', () => {
  cy.request({
    method: 'POST',
    url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
    body: {
      grant_type: 'password',
      username: Cypress.env('auth0_username'),
      password: Cypress.env('auth0_password'),
      scope: 'openid',
      client_id: Cypress.env('auth0_client_id'),
      client_secret: 'ultYE02-Io36pgLeFQplVcq285AorKIuHPCW6sPhjRFN_-hO-9nn6HXpd6zHFDZh' // Replace with your actual client secret if needed
    }
  }).then((resp) => {
    cy.setCookie('auth0_token', resp.body.access_token);
  })
});