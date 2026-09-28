export type Digit =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type Operator = "add" | "subtract" | "multiply" | "divide";

export type OperatorSymbol = "+" | "-" | "×" | "÷";

export type CalculatorButtonLabel =
  | Digit
  | OperatorSymbol
  | "."
  | "C"
  | "CE"
  | "=";

export type CalculatorState = Readonly<{
  strDisplay1: string;
  strDisplay2: string;
}>;

export type CalculatorAction =
  | Readonly<{ strType: "digitInput"; strDigit: Digit }>
  | Readonly<{ strType: "decimalPointInput" }>
  | Readonly<{ strType: "operatorInput"; strOperator: Operator }>
  | Readonly<{ strType: "calculate" }>
  | Readonly<{ strType: "clearAll" }>
  | Readonly<{ strType: "clearEntry" }>;

export type CalculatorDisplayProps = Readonly<{
  strDisplay1: string;
  strDisplay2: string;
}>;

export type CalculatorButtonProps = Readonly<{
  strLabel: CalculatorButtonLabel;
  strAccessibleName: string;
  strVisualKind: "number" | "operator" | "clear" | "equals";
  strGridArea: string;
  fnHandlePress: () => void;
}>;

export type CalculatorKeypadProps = Readonly<{
  fnHandleDigitPress: (strDigit: Digit) => void;
  fnHandleDecimalPointPress: () => void;
  fnHandleOperatorPress: (strOperator: Operator) => void;
  fnHandleCalculatePress: () => void;
  fnHandleClearAllPress: () => void;
  fnHandleClearEntryPress: () => void;
}>;

export type CalculatorProps = CalculatorDisplayProps & CalculatorKeypadProps;
