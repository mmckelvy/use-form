import React from 'react'
import WithArrays from './index'

describe('<WithArrays />', () => {
  it('uses replaceFields to add an item to an array', () => {
    cy.mount(<WithArrays />);

    cy.get('[data-cy=addRecipient')
      .click()
    ;

    cy.get('[data-cy=viewFields')
      .click()
    ;

    cy.get('[data-cy=fieldsDisplay').should((x) => {
      const actual = JSON.parse(x.text()).recipients.length;
      const expected = 2;

      expect(actual).to.eq(expected);
    });
  });

  it('uses replaceFields to remove an item from an array', () => {
    cy.mount(<WithArrays />);

    cy.get('[data-cy=addRecipient')
      .click()
    ;

    cy.get('[data-cy=removeRecipient')
      .click()
    ;

    cy.get('[data-cy=viewFields')
      .click()
    ;

    cy.get('[data-cy=fieldsDisplay').should((x) => {
      const actual = JSON.parse(x.text()).recipients.length;
      const expected = 1;

      expect(actual).to.eq(expected);
    });
  });
});
