describe('Проверка доступности всех страниц приложения', function() {
  it('Главная страница доступна', function() {
    cy.visit('http://localhost:3000/');
    cy.get('h1').contains('МБОУ АЛГОСОШ');
  });
  it('Страница алгоритма разворота строки доступна', function() {
    cy.visit('http://localhost:3000/recursion');
    cy.get('h3').contains('Строка');
  });
  it('Страница алгоритма поиска числа фибоначчи доступна', function() {
    cy.visit('http://localhost:3000/fibonacci');
    cy.get('h3').contains('Последовательность Фибоначчи');
  });
  it('Страница алгоритма сортировки массива доступна', function() {
    cy.visit('http://localhost:3000/sorting');
    cy.get('h3').contains('Сортировка массива');
  });
  it('Страница алгоритма работы со стеком доступна', function() {
    cy.visit('http://localhost:3000/stack');
    cy.get('h3').contains('Стек');
  });
  it('Страница алгоритма работы с очередью доступна', function() {
    cy.visit('http://localhost:3000/queue');
    cy.get('h3').contains('Очередь');
  });
  it('Страница алгоритма работы со связным списком доступна', function() {
    cy.visit('http://localhost:3000/list');
    cy.get('h3').contains('Связный список');
  });
});