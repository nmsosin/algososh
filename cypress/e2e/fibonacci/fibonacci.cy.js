import {DEFAULT} from "../../constants";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('Fibonacci page component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  })

  it('disable action button if input is empty', () => {
    cy.get('form').within(() => {
      cy.get('input').should('have.value', '');
      cy.get('button').should('be.disabled');
    });
  });

  it('performs correctly for valid input value', () => {
    const testInputValue = 3;
    const steps = [
      {
        numbers: [1],
        states: [DEFAULT],
      },
      {
        numbers: [1, 1],
        states: [DEFAULT, DEFAULT],
      },
      {
        numbers: [1, 1, 2],
        states: [DEFAULT, DEFAULT, DEFAULT],
      },
      {
        numbers: [1, 1, 2, 3],
        states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT],
      },
    ];

    cy.get('form').within(() => {
      cy.get('input').type(testInputValue);
      cy.get('button').click();
    });

    cy.get("[data-testid=\'circleBorder\']").as('border');
    cy.get("[data-testid=\'circleIndex\']").as('index');

    for (let i = 0; i < steps.length; i++) {
      cy.get('@border').each(($el, index) => {
          cy.get($el).should('have.css', 'border-color', steps[i].states[index]).contains(steps[i].numbers[index]);
          cy.get('@index').contains(index);
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };
  });
});