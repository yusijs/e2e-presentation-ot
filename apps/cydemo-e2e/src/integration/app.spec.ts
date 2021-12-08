import { State } from '@cy-demo/api-interfaces';

const saveAndVerify = (method: 'PUT' | 'POST', url = 'api/todo') => {
  cy.intercept({
    method: method,
    url
  }).as('save'); // Alias intercepted call

  cy.contains('button', 'Save') // Find save button
    .click(); // And click it

  cy.wait('@save') // Get alias
    .then(fixture => {
      const body = fixture.response.body;
      assert(!!body, 'Non-empty body returned');
    });

}

describe('cydemo', () => {
  before(() => cy.request('/api/todo/seed'))
  beforeEach(() => cy.visit('/'));

  it('Should have 1 todo during startup', () => {
    cy.get('li')
      .its('length')
      .should('equal', 1);
  });

  it('Should fail a test for swag (screenshot-demo)', {defaultCommandTimeout: 500}, () => {
    cy.get('li')
      .its('length')
      .should('equal', 5);
  });

  it('Should be possible to add a todo with default status "Pending"', () => {
    cy.contains('label', 'Title')
      .type('Type sloow', {delay: 200})
    cy.contains('label', 'Description')
      .type('Type e2e description fast!')
    cy.contains('label', 'State')
      .within(() => cy.get('select')
        .invoke('val')
        .should('equal', State.PENDING.toString(10))
  )

    saveAndVerify('POST');
  });

  it('Should be possible to edit a todo and mark it complete', () => {
    cy.contains('label', 'Title') // Find label for Title
      .click()// Click it
      .focused()// Moves focus to the label's input
      .invoke('val') // Get field value
      .should('be.empty'); // Assert empty

    cy.get('li') // Gets all "li" elements
      .first() // Get first
      .should('have.class', 'pending') // Assert pending state
      .click() // Click first li to move to edit-mode
      .invoke('text') // Get the text inside
      .as('title') // Assign to alias

    cy.get('@title') // Get alias value
      .then((t) => {
        const title = t as unknown as string; // typecast. Would normally get value in same chain

        cy.contains('label', 'Title')
          .click()
          .focused()
          .invoke('val')
          .should('equal', title); // Assert title-field is populated
      })

    cy.contains('label', 'State') // Find "state" label
      .within(() => cy.get('select') // find select inside
        .select('Done') // Select option by text
      );

    saveAndVerify('PUT', 'api/todo/**');


    cy.get('li')
      .first()
      .should('have.class', 'done')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
  });

  it('Should be possible to delete a todo', () => {

    cy.get('li')
      .its('length') // count li-tags
      .then(len => {

        cy.get('li')
          .first()
          .click();

        cy.contains('button', 'Delete')
          .click();


        cy.get('li')
          .should('have.length', len - 1); // Assert 1 todo was removed
      })

  });
});
