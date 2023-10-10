import {
  CHANGING,
  circleBorder,
  circleHead,
  circleIndex,
  circleTail,
  DEFAULT,
  MODIFIED,
  subCircle
} from "../../constants";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

const testInputValues = ['a', 'b', 'c'];
const testIndexValue = '1';

const initialState = {
  values: ['0', '34', '8', '1'],
  states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT],
  heads: [true, false, false, false],
  tails: [false, false, false, true],
};

const additionToHeadSteps = [
  {
    values: ['a', '0', '34', '8', '1'],
    states: [MODIFIED, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'tail'],
  },
  {
    values: ['a', '0', '34', '8', '1'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'tail'],
  },
];

const additionToTailSteps = [
  {
    values: ['a', '0', '34', '8', '1', 'b'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, MODIFIED],
    heads: ['head', 'none', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'none', 'tail'],
  },
  {
    values: ['a', '0', '34', '8', '1'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'none', 'tail'],
  },
];

const deletingItemsFromHeadSteps = [
  {
    deletedItem: 'a',
    values: ['a', '0', '34', '8', '1', 'b'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'none', 'tail'],
  },
  {
    values: ['0', '34', '8', '1', 'b'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'tail'],
  },
]

const deletingItemsFromTailSteps = [
  {
    deletedItem: 'b',
    values: ['0', '34', '8', '1', 'b'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'tail'],
  },
  {
    values: ['0', '34', '8', '1',],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none'],
  },
]

const additionByIndexSteps = [
  {
    values: ['0', 'c', '34', '8', '1'],
    states: [CHANGING, MODIFIED, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'tail'],
  },
  {
    values: ['0', 'c', '34', '8', '1'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'tail'],
  },
];

const deletionByIndexSteps = [
  {
    values: ['0', 'c', '34', '8', '1'],
    states: [CHANGING, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'tail'],
  },
  {
    values: ['0', '', '34', '8', '1'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'none', 'tail'],
  },
  {
    values: ['0', '34', '8', '1'],
    states: [DEFAULT, DEFAULT, DEFAULT, DEFAULT],
    heads: ['head', 'none', 'none', 'none'],
    tails: ['none', 'none', 'none', 'tail'],
  },
];

describe('Queue page component', () => {
  beforeEach(() => {
    cy.visit('list');

    cy.get('form').within(() => {
      cy.get('input').first().as('inputValue');
      cy.get('input').last().as('inputIndex');

      cy.contains('Добавить в head').as('addToHeadButton');
      cy.contains('Добавить в tail').as('addToTailButton');

      cy.contains('Удалить из head').as('deleteFromHeadButton');
      cy.contains('Удалить из tail').as('deleteFromTailButton');

      cy.contains('Добавить по индексу').as('addByIndexButton');
      cy.contains('Удалить по индексу').as('deleteByIndexButton');


    });
  })

  it('disable action buttons if all inputs are empty', () => {

    cy.get('form').within(() => {
      cy.get('@inputValue').should('have.value', '');
      cy.get('@inputIndex').should('be.empty');

      cy.get('@addToHeadButton').should('be.disabled');
      cy.get('@addToTailButton').should('be.disabled');
      cy.get('@addByIndexButton').should('be.disabled');
      cy.get('@deleteByIndexButton').should('be.disabled');
    });


      cy.get(circleBorder).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', initialState.states[index]).contains(initialState.values[index])
        initialState.heads[index] ? cy.get($el).get(circleHead).contains('head') : cy.get($el).get(circleHead).should('be.empty');
        initialState.tails[index] ? cy.get($el).get(circleTail).contains('tail') : cy.get($el).get(circleTail).should('be.empty');
      });
  });

  it('performs item addition & item deletion of all types correctly for valid input values', () => {
    // Adding item to head
    cy.get('form').within(() => {
      cy.get('@inputValue').type(testInputValues[0]);
      cy.get('@addToHeadButton').should('not.be.disabled').click();
    });

    cy.get(subCircle).should('have.css', 'border-color', CHANGING).contains(testInputValues[0]);

    for (let i = 0; i < additionToHeadSteps.length; i++) {
      cy.get(circleBorder).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', additionToHeadSteps[i].states[index]).contains(additionToHeadSteps[i].values[index]);
        cy.get(circleIndex).contains(index);
        additionToHeadSteps[i].heads[index] === 'head'
          ? cy.get($el).get(circleHead).contains('head')
          : cy.get($el).get(circleHead).should('be.empty');
        additionToHeadSteps[i].tails[index] === 'tail'
          ? cy.get($el).get(circleTail).contains('tail')
          : cy.get($el).get(circleTail).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

  // Adding item to tail
    cy.get('form').within(() => {
      cy.get('@inputValue').type(testInputValues[1]);
      cy.get('@addToTailButton').should('not.be.disabled').click();
    });

    cy.get(subCircle).should('have.css', 'border-color', CHANGING).contains(testInputValues[1]);

    for (let i = 0; i < additionToTailSteps.length; i++) {
      cy.get(circleBorder).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', additionToTailSteps[i].states[index]).contains(additionToTailSteps[i].values[index]);
        cy.get(circleIndex).contains(index);
        additionToTailSteps[i].heads[index] === 'head'
          ? cy.get($el).get(circleHead).contains('head')
          : cy.get($el).get(circleHead).should('be.empty');
        additionToTailSteps[i].tails[index] === 'tail'
          ? cy.get($el).get(circleTail).contains('tail')
          : cy.get($el).get(circleTail).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

  // Deleting item from head
    cy.get('form').within(() => {
      cy.get('@deleteFromHeadButton').should('not.be.disabled').click();
    });

    cy.get(subCircle).should('have.css', 'border-color', CHANGING).contains(deletingItemsFromHeadSteps[0].deletedItem);
    cy.wait(SHORT_DELAY_IN_MS);

    for (let i = 1; i < deletingItemsFromHeadSteps.length; i++) {
      cy.get(circleBorder).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', deletingItemsFromHeadSteps[i].states[index]).should('have.text', deletingItemsFromHeadSteps[i].values[index]);
        cy.get(circleIndex).contains(index);
        deletingItemsFromHeadSteps[i].heads[index] === 'head'
          ? cy.get($el).get(circleHead).contains('head')
          : cy.get($el).get(circleHead).should('be.empty');
        deletingItemsFromHeadSteps[i].tails[index] === 'tail'
          ? cy.get($el).get(circleTail).contains('tail')
          : cy.get($el).get(circleTail).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

  // Deleting item from tail
    cy.get('form').within(() => {
      cy.get('@deleteFromTailButton').should('not.be.disabled').click();
    });

    cy.get(subCircle).should('have.css', 'border-color', CHANGING).contains(deletingItemsFromTailSteps[0].deletedItem);
    cy.wait(SHORT_DELAY_IN_MS);

    for (let i = 1; i < deletingItemsFromTailSteps.length; i++) {
      cy.get(circleBorder).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', deletingItemsFromTailSteps[i].states[index]).should('have.text', deletingItemsFromTailSteps[i].values[index]);
        cy.get(circleIndex).contains(index);
        deletingItemsFromTailSteps[i].heads[index] === 'head'
          ? cy.get($el).get(circleHead).contains('head')
          : cy.get($el).get(circleHead).should('be.empty');
        deletingItemsFromTailSteps[i].tails[index] === 'tail'
          ? cy.get($el).get(circleTail).contains('tail')
          : cy.get($el).get(circleTail).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

  // Adding item by index
    cy.get('form').within(() => {
      cy.get('@inputValue').type(testInputValues[2]);
      cy.get('@inputIndex').type(testIndexValue);
      cy.get('@addByIndexButton').should('not.be.disabled').click();
    });

    for (let i = 0; i < additionByIndexSteps.length; i++) {
      cy.get(circleBorder).each(($el, index) => {
      // cy.wait(SHORT_DELAY_IN_MS);
        cy.get($el).should('have.css', 'border-color', additionByIndexSteps[i].states[index]).contains(additionByIndexSteps[i].values[index]);
        cy.get(circleIndex).contains(index);
        additionByIndexSteps[i].heads[index] === 'head'
          ? cy.get($el).get(circleHead).contains('head')
          : cy.get($el).get(circleHead).should('be.empty');
        additionByIndexSteps[i].tails[index] === 'tail'
          ? cy.get($el).get(circleTail).contains('tail')
          : cy.get($el).get(circleTail).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };


  // Deleting item by index
    cy.get('form').within(() => {
      cy.get('@deleteByIndexButton').should('not.be.disabled').click();
    });

    for (let i = 0; i < deletionByIndexSteps.length; i++) {
      cy.get(circleBorder).each(($el, index) => {
        cy.get($el).should('have.css', 'border-color', deletionByIndexSteps[i].states[index]).should('have.text', deletionByIndexSteps[i].values[index]);
        deletionByIndexSteps[i].heads[index] === 'head'
          ? cy.get($el).get(circleHead).contains('head')
          : cy.get($el).get(circleHead).should('be.empty');
        deletionByIndexSteps[i].tails[index] === 'tail'
          ? cy.get($el).get(circleTail).contains('tail')
          : cy.get($el).get(circleTail).should('be.empty');
      });
      cy.wait(SHORT_DELAY_IN_MS);
    };

  });
});
