import {CHANGING, DEFAULT, MODIFIED} from "../../constants";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('String page component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  })

  it('disable action button if input is empty', () => {
    cy.get('form').within(() => {
      cy.get('input').should('have.value', '');
      cy.get('button').should('be.disabled');
    });
  });

  it('performs correctly non-empty string reversal', () => {
    const testString = 'string';
    const steps = [
      {
        letters: ['s', 't', 'r', 'i', 'n', 'g'],
        states: [CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, CHANGING]
      },
      {
        letters: ['g', 't', 'r', 'i', 'n', 's'],
        states: [MODIFIED, CHANGING, DEFAULT, DEFAULT, CHANGING, MODIFIED]
      },
      {
        letters: ['g', 'n', 'r', 'i', 't', 's'],
        states: [MODIFIED, MODIFIED, CHANGING, CHANGING, MODIFIED, MODIFIED]
      },
      {
        letters: ['g', 'n', 'i', 'r', 't', 's'],
        states: [MODIFIED, MODIFIED, MODIFIED, MODIFIED, MODIFIED, MODIFIED]
      },
    ];

    cy.get('form').within(() => {
      cy.get('input').type(testString);
      cy.get('button').click();
    });

    cy.get("[data-testid=\'circleBorder\']").as('border');

    // iterative render circles with letter values and changing its state
    for (let i = 0; i < steps.length; i++) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get('@border').each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', steps[i].states[index]).contains(steps[i].letters[index]);
      });
    }
  });
})