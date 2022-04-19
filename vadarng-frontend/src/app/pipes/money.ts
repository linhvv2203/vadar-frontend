import { Pipe, PipeTransform } from "@angular/core";
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: "money" })
export class MoneyPipe implements PipeTransform {
  formatMoney(number: number) {
    return number.toFixed(2).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }

  transform(value: number, exponent?: number): string {
    if (!value) return "0.00";
    return this.formatMoney(Number(value));
  }
}
