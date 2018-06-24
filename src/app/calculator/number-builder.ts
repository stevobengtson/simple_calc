export class NumberBuilder {
  private readonly decimal = '.';
  private _numberList = [];

  pushNumber(value: number): void {
    this._numberList.push(value);
  }

  pop(): number | string {
    return this._numberList.pop();
  }

  pushDecimal(): boolean {
    const hasDecimal = this._numberList.some(element => element === this.decimal);
    if (!hasDecimal) {
      if (this._numberList.length === 0)
        this.pushNumber(0);
      this._numberList.push(this.decimal);
    }

    return hasDecimal;
  }

  get value(): number {
    if (this._numberList.length === 0)
      return 0;
    else
      return parseFloat(this._numberList.join(''));
  }

  set value(val: number) {
    this._numberList = val.toString(10)
      .split('');
  }

  clear(): void {
    this._numberList = [];
  }
}
