import {CHANGING, DEFAULT} from "../../constants";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

const testInputValues = ['a', 'b'];
const initialState = {
  values: ['', '', '', '', '', '' ,''],
  states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
  heads: [false, false, false, false, false, false, false],
  tails: [false, false, false, false, false, false, false],
};

const additionSteps = [
  {
    values: ['a', '', '', '', '', '' ,''],
    states: [CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: [true, false, false, false, false, false, false],
    tails: [true, false, false, false, false, false, false],
  },
  {
    values: ['a', '', '', '', '', '' ,''],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: [true, false, false, false, false, false, false],
    tails: [true, false, false, false, false, false, false],
  },
  {
    values: ['a', 'b', '', '', '', '' ,''],
    states: [DEFAULT, CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: [true, false, false, false, false, false, false],
    tails: [false, true, false, false, false, false, false],
  },
  {
    values: ['a', 'b', '', '', '', '' ,''],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: [true, false, false, false, false, false, false],
    tails: [false, true, false, false, false, false, false],
  },

];

const deletionSteps = [
  {
    values: ['a', 'b', '', '', '', '' ,''],
    states: [CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: [true, false, false, false, false, false, false],
    tails: [false, true, false, false, false, false, false],
  },
  {
    values: ['', 'b', '', '', '', '' ,''],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: [false, true, false, false, false, false, false],
    tails: [false, true, false, false, false, false, false],
  },
]

describe('Queue page component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');

    cy.get('form').within(() => {
      cy.contains('Добавить').as('addButton');
      cy.contains('Удалить').as('deleteButton');
      cy.contains('Очистить').as('clearButton');
    });

    cy.get("[data-testid=\'circleBorder\']").as('border');
    cy.get("[data-testid=\'circleIndex\']").as('index');
    cy.get("[data-testid=\'circleHead\']").as('head');
    cy.get("[data-testid=\'circleTail\']").as('tail');

  })

  it('disable action buttons if input & initial stack are empty', () => {

    cy.get('form').within(() => {
      cy.get('input').should('have.value', '');
      cy.get('@addButton').should('be.disabled');
      cy.get('@deleteButton').should('be.disabled');
      cy.get('@clearButton').should('be.disabled');
    });
  });

  it('performs item addition, item deletion & clearing queue correctly for valid input values', () => {
    // Adding first item
    cy.get('form').within(() => {
      cy.get('input').type(testInputValues[0]);
      cy.get('@addButton').should('not.be.disabled').click();
    });

    for (let i = 0; i < additionSteps.length / (testInputValues.length); i++) {
      cy.get('@border').each(($el, index) => {
        additionSteps[i].values[index].length === 0
          ? cy.get($el).should('have.css', 'border-color', additionSteps[i].states[index]).should('have.text', '')
          : cy.get($el).should('have.css', 'border-color', additionSteps[i].states[index]).contains(additionSteps[i].values[index]);
        cy.get('@index').contains(index);
        additionSteps[i].heads[index] ? cy.get($el).get('@head').contains('head') : cy.get($el).get('@head').should('be.empty');
        additionSteps[i].tails[index] ? cy.get($el).get('@tail').contains('tail') : cy.get($el).get('@tail').should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

    // Adding second item
    cy.get('form').within(() => {
      cy.get('input').type(testInputValues[1]);
      cy.get('@addButton').should('not.be.disabled').click();
    });

    for (let i = 2; i < additionSteps.length; i++) {
      cy.get('@border').each(($el, index) => {
        additionSteps[i].values[index].length === 0
          ? cy.get($el).should('have.css', 'border-color', additionSteps[i].states[index]).should('have.text', '')
          : cy.get($el).should('have.css', 'border-color', additionSteps[i].states[index]).contains(additionSteps[i].values[index]);
        cy.get('@index').contains(index);
        additionSteps[i].heads[index] ? cy.get($el).get('@head').contains('head') : cy.get($el).get('@head').should('be.empty');
        additionSteps[i].tails[index] ? cy.get($el).get('@tail').contains('tail') : cy.get($el).get('@tail').should('be.empty');

      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

    // Deleting last item
    cy.get('form').within(() => {
      cy.get('@deleteButton').should('not.be.disabled').click();
    });

    for (let i = 0; i < deletionSteps.length; i++) {
      cy.get('@border').each(($el, index) => {
        deletionSteps[i].values[index].length === 0
          ? cy.get($el).should('have.css', 'border-color', deletionSteps[i].states[index]).should('have.text', '')
          : cy.get($el).should('have.css', 'border-color', deletionSteps[i].states[index]).contains(deletionSteps[i].values[index]);
        cy.get('@index').contains(index);
        deletionSteps[i].heads[index] ? cy.get($el).get('@head').contains('head') : cy.get($el).get('@head').should('be.empty');
        deletionSteps[i].tails[index] ? cy.get($el).get('@tail').contains('tail') : cy.get($el).get('@tail').should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

    // Clearing stack
    cy.get('form').within(() => {
      cy.get('@clearButton').should('not.be.disabled').click();
    });

      cy.get('@border').each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', initialState.states[index]).should('have.text', '')
        initialState.heads[index] ? cy.get($el).get('@head').contains('head') : cy.get($el).get('@head').should('be.empty');
        initialState.tails[index] ? cy.get($el).get('@tail').contains('tail') : cy.get($el).get('@tail').should('be.empty');
      });
  });

});