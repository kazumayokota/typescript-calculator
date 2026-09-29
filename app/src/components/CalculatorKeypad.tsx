import type { ReactElement } from "react";

import type { CalculatorKeypadProps } from "../logic/types.ts";
import { CalculatorButton } from "./CalculatorButton.tsx";

import "./CalculatorKeypad.css";

export function CalculatorKeypad({
  fnHandleDigitPress,
  fnHandleDecimalPointPress,
  fnHandleOperatorPress,
  fnHandleCalculatePress,
  fnHandleClearAllPress,
  fnHandleClearEntryPress,
}: CalculatorKeypadProps): ReactElement {
  return (
    <div aria-label="計算キー" className="calculator-keypad" role="group">
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("7"); }} strAccessibleName="数字7" strControlId="btn7" strGridArea="seven" strLabel="7" strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("8"); }} strAccessibleName="数字8" strControlId="btn8" strGridArea="eight" strLabel="8" strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("9"); }} strAccessibleName="数字9" strControlId="btn9" strGridArea="nine" strLabel="9" strVisualKind="number" />
      <CalculatorButton fnHandlePress={fnHandleClearAllPress} strAccessibleName="全体クリア" strControlId="btnC" strGridArea="clear" strLabel="C" strVisualKind="clear" />
      <CalculatorButton fnHandlePress={fnHandleClearEntryPress} strAccessibleName="入力クリア" strControlId="btnCe" strGridArea="clearEntry" strLabel="CE" strVisualKind="clear" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("4"); }} strAccessibleName="数字4" strControlId="btn4" strGridArea="four" strLabel="4" strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("5"); }} strAccessibleName="数字5" strControlId="btn5" strGridArea="five" strLabel="5" strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("6"); }} strAccessibleName="数字6" strControlId="btn6" strGridArea="six" strLabel="6" strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleOperatorPress("add"); }} strAccessibleName="加算" strControlId="btnLogicPlus" strGridArea="add" strLabel="+" strVisualKind="operator" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleOperatorPress("subtract"); }} strAccessibleName="減算" strControlId="btnLogicMinus" strGridArea="subtract" strLabel="-" strVisualKind="operator" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("1"); }} strAccessibleName="数字1" strControlId="btn1" strGridArea="one" strLabel="1" strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("2"); }} strAccessibleName="数字2" strControlId="btn2" strGridArea="two" strLabel="2" strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("3"); }} strAccessibleName="数字3" strControlId="btn3" strGridArea="three" strLabel="3" strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleOperatorPress("multiply"); }} strAccessibleName="乗算" strControlId="btnLogicMultiplication" strGridArea="multiply" strLabel="×" strVisualKind="operator" />
      <CalculatorButton fnHandlePress={fnHandleCalculatePress} strAccessibleName="計算" strControlId="btnEqual" strGridArea="equals" strLabel="=" strVisualKind="equals" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleDigitPress("0"); }} strAccessibleName="数字0" strControlId="btn0" strGridArea="zero" strLabel="0" strVisualKind="number" />
      <CalculatorButton fnHandlePress={fnHandleDecimalPointPress} strAccessibleName="小数点" strControlId="btnShosuten" strGridArea="decimal" strLabel="." strVisualKind="number" />
      <CalculatorButton fnHandlePress={(): void => { fnHandleOperatorPress("divide"); }} strAccessibleName="除算" strControlId="btnLogicDivision" strGridArea="divide" strLabel="÷" strVisualKind="operator" />
    </div>
  );
}
