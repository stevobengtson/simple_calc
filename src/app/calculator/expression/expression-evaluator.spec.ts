import { ExpressionEvaluator } from './expression-evaluator';
import { ExpressionBuilder } from './expression-builder';

describe('ExpresionEvaluator', () => {
  let expresionEvaluator: ExpressionEvaluator;

  beforeEach(() => {
    expresionEvaluator = new ExpressionEvaluator();
  });

  it('should add two numbers', () => {
    const expressionBuilder = new ExpressionBuilder();
    expressionBuilder.addExpression('123');
    expressionBuilder.addExpression('+');
    expressionBuilder.addExpression('321');

    const result = expresionEvaluator.evaluate(expressionBuilder);
    expect(result)
      .toBe(444);
  });

  it('should evaluate an expression with operator at the end', () => {
    const expressionBuilder = new ExpressionBuilder();
    expressionBuilder.addExpression('123');
    expressionBuilder.addExpression('-');
    expressionBuilder.addExpression('1');
    expressionBuilder.addExpression('+');

    const result = expresionEvaluator.evaluate(expressionBuilder);
    expect(result)
      .toBe(122);
  });

  it('should allow up to 8 decimal places', () => {
    const expressionBuilder = new ExpressionBuilder();
    expressionBuilder.addExpression('1.23456789555');
    expressionBuilder.addExpression('+');
    expressionBuilder.addExpression('1');

    const result = expresionEvaluator.evaluate(expressionBuilder);
    expect(result)
      .toBe(2.23456790);
  });
});
