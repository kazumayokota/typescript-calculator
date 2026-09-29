import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import {
  calculateResult,
  formatCalculationResult,
  getOperatorSymbol,
  intInsert,
  parseDisplay1,
} from "./calculator.ts";

describe("calculator common logic", (): void => {
  it("数字を設計書どおりに追加する", (): void => {
    expect(intInsert("", "5")).toBe("5");
    expect(intInsert("0", "5")).toBe("5");
    expect(intInsert("12", "3")).toBe("123");
  });

  it("小数点の先頭入力と重複入力を無視する", (): void => {
    expect(intInsert("", ".")).toBe("");
    expect(intInsert("1", ".")).toBe("1.");
    expect(intInsert("1.2", ".")).toBe("1.2");
  });

  it("内部演算子を表示記号へ変換する", (): void => {
    expect(getOperatorSymbol("add")).toBe("+");
    expect(getOperatorSymbol("subtract")).toBe("-");
    expect(getOperatorSymbol("multiply")).toBe("×");
    expect(getOperatorSymbol("divide")).toBe("÷");
  });

  it("計算1表示を左辺と演算子へ分解する", (): void => {
    expect(parseDisplay1("12.5×")).toEqual({
      strLeftOperand: "12.5",
      strOperator: "multiply",
    });
    expect(parseDisplay1("-3+")).toEqual({
      strLeftOperand: "-3",
      strOperator: "add",
    });
  });

  it("不正な計算1表示を拒否する", (): void => {
    expect((): void => {
      parseDisplay1("");
    }).toThrow(TypeError);
    expect((): void => {
      parseDisplay1("12%");
    }).toThrow(TypeError);
  });

  it("四則演算を実行する", (): void => {
    expect(calculateResult("1", "2", "add")).toBe("3");
    expect(calculateResult("5", "8", "subtract")).toBe("-3");
    expect(calculateResult("3", "4", "multiply")).toBe("12");
    expect(calculateResult("8", "2", "divide")).toBe("4");
  });

  it("2進浮動小数点誤差を表示しない", (): void => {
    expect(calculateResult("0.1", "0.2", "add")).toBe("0.3");
  });

  it("小数点以下15桁を四捨五入する", (): void => {
    expect(calculateResult("1", "3", "divide")).toBe("0.333333333333333");
    expect(calculateResult("2", "3", "divide")).toBe("0.666666666666667");
    expect(formatCalculationResult(new Decimal("0.0000000000000004"))).toBe(
      "0",
    );
    expect(formatCalculationResult(new Decimal("0.0000000000000005"))).toBe(
      "0.000000000000001",
    );
    expect(formatCalculationResult(new Decimal("-0.0000000000000005"))).toBe(
      "-0.000000000000001",
    );
  });

  it("0除算では設計書どおり0を返す", (): void => {
    expect(calculateResult("8", "0", "divide")).toBe("0");
  });

  it("末尾の0と負の0を正規化する", (): void => {
    expect(formatCalculationResult(new Decimal("1.230000"))).toBe("1.23");
    expect(formatCalculationResult(new Decimal("-0"))).toBe("0");
  });

  it("入力途中の末尾小数点を明示変換して計算する", (): void => {
    expect(calculateResult("1.", "2.", "add")).toBe("3");
  });
});
