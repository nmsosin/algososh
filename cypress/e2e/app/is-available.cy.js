describe('App works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3000/');
  })
  it('should open main page by default', function() {
    cy.get('h1').contains('МБОУ АЛГОСОШ');
  });

  it('string-page reverse page is available', function() {
    cy.visit('http://localhost:3000/recursion');
    cy.get('h3').contains('Строка');
  });
  it('fibonacci page is available', function() {
    cy.visit('http://localhost:3000/fibonacci');
    cy.get('h3').contains('Последовательность Фибоначчи');
  });
  it('array sort page is available', function() {
    cy.visit('http://localhost:3000/sorting');
    cy.get('h3').contains('Сортировка массива');
  });
  it('stack page is available', function() {
    cy.visit('http://localhost:3000/stack');
    cy.get('h3').contains('Стек');
  });
  it('queue page is available', function() {
    cy.visit('http://localhost:3000/queue');
    cy.get('h3').contains('Очередь');
  });
  it('linked list page is available', function() {
    cy.visit('http://localhost:3000/list');
    cy.get('h3').contains('Связный список');
  });
});