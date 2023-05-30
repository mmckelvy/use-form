import React from 'react'
import Basic from './index'

describe('<Basic />', () => {
  it('submits a valid form', () => {
    cy.mount(<Basic />);

    cy.get('[data-cy=firstNameInput')
      .type('John')
    ;

    cy.get('[data-cy=lastNameInput')
      .type('Smith')
    ;

    cy.get('[data-cy=submit')
      .click()
    ;

    cy.get('[data-cy=results').should((x) => {
      const actual = JSON.parse(x.text());
      const expected = {firstName: 'John', lastName: 'Smith'};

      expect(actual).to.deep.eq(expected);
    });
  });
});
