import { describe, expect, it } from "vitest";

import {
  objInitialCalculatorState,
  reduceCalculatorState,
} from "./calculatorReducer.ts";
import type { CalculatorState } from "./types.ts";

describe("calculator reducer", (): void => {
  it("S0で演算子を入力しても状態を維持する", (): void => {
    expect(
      reduceCalculatorState(objInitialCalculatorState, {
        strType: "operatorInput",
        strOperator: "add",
      }),
    ).toBe(objInitialCalculatorState);
  });

  it("S0で数字を入力してS1へ遷移する", (): void => {
    expect(
      reduceCalculatorState(objInitialCalculatorState, {
        strType: "digitInput",
        strDigit: "7",
      }),
    ).toEqual({ strDisplay1: "", strDisplay2: "7" });
  });

  it("先頭の不要な0を置換する", (): void => {
    const objState: CalculatorState = { strDisplay1: "", strDisplay2: "0" };

    expect(
      reduceCalculatorState(objState, {
        strType: "digitInput",
        strDigit: "5",
      }),
    ).toEqual({ strDisplay1: "", strDisplay2: "5" });
  });

  it("空表示への小数点入力を無視する", (): void => {
    expect(
      reduceCalculatorState(objInitialCalculatorState, {
        strType: "decimalPointInput",
      }),
    ).toBe(objInitialCalculatorState);
  });

  it("S1で演算子を入力してS2へ遷移する", (): void => {
    const objState: CalculatorState = { strDisplay1: "", strDisplay2: "12" };

    expect(
      reduceCalculatorState(objState, {
        strType: "operatorInput",
        strOperator: "add",
      }),
    ).toEqual({ strDisplay1: "12+", strDisplay2: "" });
  });

  it("S2で演算子を置き換える", (): void => {
    const objState: CalculatorState = { strDisplay1: "12+", strDisplay2: "" };

    expect(
      reduceCalculatorState(objState, {
        strType: "operatorInput",
        strOperator: "multiply",
      }),
    ).toEqual({ strDisplay1: "12×", strDisplay2: "" });
  });

  it("S3で演算子を入力すると即時計算してS2へ遷移する", (): void => {
    const objState: CalculatorState = { strDisplay1: "2+", strDisplay2: "3" };

    expect(
      reduceCalculatorState(objState, {
        strType: "operatorInput",
        strOperator: "multiply",
      }),
    ).toEqual({ strDisplay1: "5×", strDisplay2: "" });
  });

  it("S3で計算して結果をS1へ表示する", (): void => {
    const objState: CalculatorState = { strDisplay1: "5×", strDisplay2: "4" };

    expect(
      reduceCalculatorState(objState, { strType: "calculate" }),
    ).toEqual({ strDisplay1: "", strDisplay2: "20" });
  });

  it("連続演算を左から順に計算する", (): void => {
    let objState = reduceCalculatorState(objInitialCalculatorState, {
      strType: "digitInput",
      strDigit: "2",
    });
    objState = reduceCalculatorState(objState, {
      strType: "operatorInput",
      strOperator: "add",
    });
    objState = reduceCalculatorState(objState, {
      strType: "digitInput",
      strDigit: "3",
    });
    objState = reduceCalculatorState(objState, {
      strType: "operatorInput",
      strOperator: "multiply",
    });
    objState = reduceCalculatorState(objState, {
      strType: "digitInput",
      strDigit: "4",
    });
    objState = reduceCalculatorState(objState, { strType: "calculate" });

    expect(objState).toEqual({ strDisplay1: "", strDisplay2: "20" });
  });

  it("不足値がある状態の計算を無視する", (): void => {
    const objStateS1: CalculatorState = {
      strDisplay1: "",
      strDisplay2: "3",
    };
    const objStateS2: CalculatorState = {
      strDisplay1: "3+",
      strDisplay2: "",
    };

    expect(
      reduceCalculatorState(objStateS1, { strType: "calculate" }),
    ).toBe(objStateS1);
    expect(
      reduceCalculatorState(objStateS2, { strType: "calculate" }),
    ).toBe(objStateS2);
  });

  it("計算結果後の数字を設計書どおり末尾へ追加する", (): void => {
    const objState: CalculatorState = { strDisplay1: "", strDisplay2: "3" };

    expect(
      reduceCalculatorState(objState, {
        strType: "digitInput",
        strDigit: "4",
      }),
    ).toEqual({ strDisplay1: "", strDisplay2: "34" });
  });

  it("計算後にイコールを繰り返しても結果を維持する", (): void => {
    const objState: CalculatorState = { strDisplay1: "", strDisplay2: "3" };

    expect(
      reduceCalculatorState(objState, { strType: "calculate" }),
    ).toBe(objState);
  });

  it("Cで両表示をクリアする", (): void => {
    const objState: CalculatorState = { strDisplay1: "12+", strDisplay2: "3" };

    expect(
      reduceCalculatorState(objState, { strType: "clearAll" }),
    ).toEqual(objInitialCalculatorState);
  });

  it("CEで計算2だけをクリアする", (): void => {
    const objState: CalculatorState = { strDisplay1: "12+", strDisplay2: "3" };

    expect(
      reduceCalculatorState(objState, { strType: "clearEntry" }),
    ).toEqual({ strDisplay1: "12+", strDisplay2: "" });
  });

  it("0除算を0として表示する", (): void => {
    const objState: CalculatorState = { strDisplay1: "8÷", strDisplay2: "0" };

    expect(
      reduceCalculatorState(objState, { strType: "calculate" }),
    ).toEqual({ strDisplay1: "", strDisplay2: "0" });
  });
});
