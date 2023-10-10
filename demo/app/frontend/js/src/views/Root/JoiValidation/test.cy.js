import React from 'react'
import JoiValidation from './index'

describe('<JoiValidation />', () => {
  it('submits a valid form using schema validation', () => {
    cy.mount(<JoiValidation />);

    cy.get('[data-cy=subjectInput')
      .type('Important Matter')
    ;

    cy.get('[data-cy=recipients0EmailInput')
      .type('main@info.com')
    ;

    cy.get('[data-cy=recipients0LocationInput')
      .type('Nebraska')
    ;

    cy.get('[data-cy=submit')
      .click()
    ;

    cy.get('[data-cy=results').should((x) => {
      const actual = JSON.parse(x.text());
      const expected = {
        subject: 'Important Matter',
        recipients: [
          {
            email: 'main@info.com',
            location: 'Nebraska'
          }
        ]
      };

      expect(actual).to.deep.eq(expected);
    });
  });

  it('flags errors using schema validation', () => {
    cy.mount(<JoiValidation />);

    cy.get('[data-cy=submit')
      .click()
    ;

    cy.get('[data-cy=errors').should((x) => {
      const actual = JSON.parse(x.text());
      const expected = {
        fieldErrors: [
          {
            path: 'subject.error',
            message: 'Subject is required'
          },
        ],
        generalErrors: [
          {
            path: 'recipients',
            message: 'Recipients is required'
          }
        ]
      };

      expect(actual).to.deep.eq(expected);
    });
  });
});

