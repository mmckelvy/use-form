import React from 'react'
import Undo from './index'

describe('<Undo />', () => {
  it('uses setFields to create a snapshot', () => {
    cy.mount(<Undo />);

    cy.get('[data-cy=firstNameInput')
      .type('John')
    ;

    cy.get('[data-cy=lastNameInput')
      .type('Smith')
    ;

    cy.get('[data-cy=snapshot')
      .click()
    ;

    cy.get('[data-cy=viewFields')
      .click()
    ;

    cy.get('[data-cy=fields').should((x) => {
      const o = JSON.parse(x.text());
      expect(o.firstName.snapshot).to.eq('John');
      expect(o.lastName.snapshot).to.eq('Smith');
    });
  });

  it('uses setFields and the snapshot field to undo', () => {
    cy.mount(<Undo />);

    cy.get('[data-cy=firstNameInput')
      .type('John')
    ;

    cy.get('[data-cy=lastNameInput')
      .type('Smith')
    ;

    cy.get('[data-cy=snapshot')
      .click()
    ;

    cy.get('[data-cy=firstNameInput')
      .type('Bill')
    ;

    cy.get('[data-cy=lastNameInput')
      .type('Johnson')
    ;

    cy.get('[data-cy=undo')
      .click()
    ;

    cy.get('[data-cy=viewFields')
      .click()
    ;

    cy.get('[data-cy=fields').should((x) => {
      const o = JSON.parse(x.text());
      expect(o.firstName.snapshot).to.eq('John');
      expect(o.lastName.snapshot).to.eq('Smith');
    });
  });
});
