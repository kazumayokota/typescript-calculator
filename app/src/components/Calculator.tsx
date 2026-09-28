import type { ReactElement } from "react";

import type { CalculatorProps } from "../logic/types.ts";
import { CalculatorDisplay } from "./CalculatorDisplay.tsx";
import { CalculatorKeypad } from "./CalculatorKeypad.tsx";

import "./Calculator.css";

export function Calculator({
  strDisplay1,
  strDisplay2,
  fnHandleDigitPress,
  fnHandleDecimalPointPress,
  fnHandleOperatorPress,
  fnHandleCalculatePress,
  fnHandleClearAllPress,
  fnHandleClearEntryPress,
}: CalculatorProps): ReactElement {
  return (
    <section aria-label="計算機" className="calculator">
      <CalculatorDisplay strDisplay1={strDisplay1} strDisplay2={strDisplay2} />
      <CalculatorKeypad
        fnHandleCalculatePress={fnHandleCalculatePress}
        fnHandleClearAllPress={fnHandleClearAllPress}
        fnHandleClearEntryPress={fnHandleClearEntryPress}
        fnHandleDecimalPointPress={fnHandleDecimalPointPress}
        fnHandleDigitPress={fnHandleDigitPress}
        fnHandleOperatorPress={fnHandleOperatorPress}
      />
    </section>
  );
}
