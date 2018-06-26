import { ExpressionBuilder } from './expression-builder';

describe('ExpresionBuilder', () => {
  let expresionBuilder: ExpressionBuilder;

  beforeEach(() => {
    expresionBuilder = new ExpressionBuilder();
  });

  it('should have no length if no items are added', () => {
    expect(expresionBuilder.length)
      .toBe(0);
  });

  it('should not have an operator if none has been added', () => {
    expresionBuilder.addExpression('123');
    expect(expresionBuilder.hasOperator())
      .toBe(false);
  });

  describe('Expressions', () => {
    beforeEach(() => {
      expresionBuilder.addExpression('123');
      expresionBuilder.addExpression('+');
      expresionBuilder.addExpression('321');
    });

    it('should add expressions', () => {
      expect(expresionBuilder.toString())
        .toBe('123+321');
    });

    it('should clear the expression', () => {
      expresionBuilder.clear();
      expect(expresionBuilder.toString())
        .toBe('');
    });

    it('should pop the last expression', () => {
      const expression = expresionBuilder.pop();
      expect(expresionBuilder.toString())
        .toBe('123+');
      expect(expression)
        .toBe('321');
    });

    it('should return the last operator', () => {
      expresionBuilder.addExpression('-');
      const tailOperator = expresionBuilder.tailOperator();
      expect(tailOperator)
        .toBe('-');
    });

    it('should return undefined if not operator in last position', () => {
      const tailOperator = expresionBuilder.tailOperator();
      expect(tailOperator)
        .toBeUndefined();
    });
  });
});
