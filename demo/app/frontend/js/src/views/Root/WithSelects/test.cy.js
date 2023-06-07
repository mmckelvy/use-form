import React from 'react'
import WithSelects from './index'

describe('<WithSelects />', () => {
  it('uses setFields to set a select value', () => {
    cy.mount(<WithSelects />);

    cy.get('[data-cy=userName')
      .select('Steve')
    ;

    cy.get('[data-cy=submit')
      .click()
    ;

    cy.get('[data-cy=results').should((x) => {
      const actual = JSON.parse(x.text());
      const expected = {
        userId: 3,
        userName: 'Steve'
      };

      expect(actual).to.deep.eq(expected);
    });
  });
});

