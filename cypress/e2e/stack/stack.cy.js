import {CHANGING, border, circleHead, circleIndex, DEFAULT} from "../../constants";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

const testInputValues = ['a', 'b'];
const additionSteps = [
  {
    values: ['a'],
    states: [CHANGING],
    heads: [true]
  },
  {
    values: ['a'],
    states: [DEFAULT],
    heads: [true]
  },
  {
    values: ['a', 'b'],
    states: [DEFAULT, CHANGING],
    heads: [false, true]
  },
  {
    values: ['a', 'b'],
    states: [DEFAULT, DEFAULT],
    heads: [false, true]
  },
];

const deletionSteps = [
  {
    values: ['a', 'b'],
    states: [DEFAULT, CHANGING],
    heads: [false, true]
  },
  {
    values: ['a'],
    states: [DEFAULT],
    head: [true]
  },
]

describe('Stack page component', () => {
  beforeEach(() => {
    cy.visit('stack');

    cy.get('form').within(() => {
      cy.contains('Добавить').as('addButton');
      cy.contains('Удалить').as('deleteButton');
      cy.contains('Очистить').as('clearButton');
    });
  })

  it('disable action buttons if input & initial stack are empty', () => {

    cy.get('form').within(() => {
      cy.get('input').should('have.value', '');
      cy.get('@addButton').should('be.disabled');
      cy.get('@deleteButton').should('be.disabled');
      cy.get('@clearButton').should('be.disabled');
    });
  });

  it('performs item addition, item deletion & clearing stack correctly for valid input values', () => {

    // Adding first item
    cy.get('form').within(() => {
      cy.get('input').type(testInputValues[0]);
      cy.get('@addButton').should('not.be.disabled').click();
    });


    for (let i = 0; i < additionSteps.length / (testInputValues.length); i++) {
      cy.get(border).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', additionSteps[i].states[index]).contains(additionSteps[i].values[index]);
        cy.get(circleIndex).contains(index);
        additionSteps[i].heads[index] ? cy.get($el).get(circleHead).contains('top') : cy.get($el).get(circleHead).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

    // Adding second item
    cy.get('form').within(() => {
      cy.get('input').type(testInputValues[1]);
      cy.get('@addButton').should('not.be.disabled').click();
    });

    for (let i = 2; i < additionSteps.length; i++) {
      cy.get(border).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', additionSteps[i].states[index]).contains(additionSteps[i].values[index]);
        cy.get(circleIndex).contains(index);
        additionSteps[i].heads[index] ? cy.get($el).get(circleHead).contains('top') : cy.get($el).get(circleHead).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

    // Deleting last item
    cy.get('form').within(() => {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get('@deleteButton').should('not.be.disabled').click();
    });

    for (let i = 0; i < deletionSteps.length; i++) {
      cy.get(border).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', deletionSteps[i].states[index]).contains(deletionSteps[i].values[index]);
        cy.get(circleIndex).contains(index);
        additionSteps[i].heads[index] ? cy.get($el).get(circleHead).contains('top') : cy.get($el).get(circleHead).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

    // Clearing stack
    cy.get('form').within(() => {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get('@clearButton').should('not.be.disabled').click();
    });

    cy.get(border).should('not.exist');
    cy.get(border).should('have.length', 0);
  });

});