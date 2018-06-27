import { ExpressionBuilder } from './expression-builder';

export class ExpressionEvaluator {
  evaluate(expressionBuilder: ExpressionBuilder): number {
    let expression = expressionBuilder.toString();
    const matcher = expression.match(/([\+\/\-\*])$/);

    if (matcher !== null)
      expression = expression.replace(/[\+\/\-\*]$/, '');

    // tslint:disable-next-line:no-eval
    const result = parseFloat(eval(expression));

    return parseFloat(result.toFixed(8));
  }
}
