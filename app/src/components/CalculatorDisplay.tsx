import type { ReactElement } from "react";

import type { CalculatorDisplayProps } from "../logic/types.ts";

import "./CalculatorDisplay.css";

export function CalculatorDisplay({
  strDisplay1,
  strDisplay2,
}: CalculatorDisplayProps): ReactElement {
  return (
    <section aria-label="計算表示" className="calculator-display">
      <output
        aria-label="計算1"
        className="calculator-display__line calculator-display__line--expression"
        id="lblLogic1"
      >
        {strDisplay1 || "\u00a0"}
      </output>
      <output
        aria-label="計算2"
        aria-live="polite"
        className="calculator-display__line calculator-display__line--current"
        id="lblLogic2"
      >
        {strDisplay2 || "\u00a0"}
      </output>
    </section>
  );
}
