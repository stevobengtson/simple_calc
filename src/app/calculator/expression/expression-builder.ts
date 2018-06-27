export class ExpressionBuilder {
  private _expressionList = [];

  get length(): number {
    return this._expressionList.length;
  }

  hasOperator(): boolean {
    return this._expressionList.some((expression: string) => this.isOperator(expression));
  }

  addExpression(value: string): void {
    if (value.match(/[\d\-\+\*\/\.]/) !== null)
      this._expressionList.push(value);
  }

  clear(): void {
    this._expressionList = [];
  }

  pop(): string {
    return this._expressionList.pop();
  }

  toString(): string {
    return this._expressionList.join('');
  }

  tailOperator(): string | undefined {
    const lastItem = this._expressionList.pop();
    if (this.isOperator(lastItem)) {
      this._expressionList.push(lastItem);

      return lastItem;
    }

    return undefined;
  }

  private isOperator = (check: string) => check.match(/([\+\/\-\*])/g) !== null;
}
