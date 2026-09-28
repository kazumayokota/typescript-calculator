import type { CSSProperties, ReactElement } from "react";

import type { CalculatorButtonProps } from "../logic/types.ts";

import "./CalculatorButton.css";

export function CalculatorButton({
  strLabel,
  strAccessibleName,
  strVisualKind,
  strGridArea,
  fnHandlePress,
}: CalculatorButtonProps): ReactElement {
  const objButtonStyle: CSSProperties = {
    gridArea: strGridArea,
  };

  return (
    <button
      aria-label={strAccessibleName}
      className={`calculator-button calculator-button--${strVisualKind}`}
      onClick={fnHandlePress}
      style={objButtonStyle}
      type="button"
    >
      {strLabel}
    </button>
  );
}
