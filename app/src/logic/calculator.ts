import Decimal from "decimal.js";

import type { CalculatorInput, Operator, OperatorSymbol } from "./types.ts";

const intMaximumDecimalPlaces = 15;
const intMinimumCalculationPrecision = 40;
const objNumericTextPattern = /^-?(?:0|[1-9]\d*)(?:\.\d*)?$/;

const objOperatorSymbolByOperator: Readonly<Record<Operator, OperatorSymbol>> = {
  add: "+",
  subtract: "-",
  multiply: "×",
  divide: "÷",
};

export type ParsedDisplay1 = Readonly<{
  strLeftOperand: string;
  strOperator: Operator;
}>;

export function intInsert(
  strCurrentValue: string,
  strInputValue: CalculatorInput,
): string {
  if (strInputValue === ".") {
    if (strCurrentValue === "" || strCurrentValue.includes(".")) {
      return strCurrentValue;
    }

    return `${strCurrentValue}.`;
  }

  if (strCurrentValue === "" || strCurrentValue === "0") {
    return strInputValue;
  }

  return `${strCurrentValue}${strInputValue}`;
}

export function getOperatorSymbol(strOperator: Operator): OperatorSymbol {
  return objOperatorSymbolByOperator[strOperator];
}

export function parseDisplay1(strDisplay1: string): ParsedDisplay1 {
  if (strDisplay1.length < 2) {
    throw new TypeError("Calculation display 1 is incomplete.");
  }

  const strOperatorSymbol = strDisplay1.slice(-1);
  const strLeftOperand = strDisplay1.slice(0, -1);

  assertValidNumericText(strLeftOperand);

  return {
    strLeftOperand,
    strOperator: getOperatorFromSymbol(strOperatorSymbol),
  };
}

export function calculateResult(
  strLeftOperand: string,
  strRightOperand: string,
  strOperator: Operator,
): string {
  assertValidNumericText(strLeftOperand);
  assertValidNumericText(strRightOperand);

  const intOperandDigits =
    countNumericDigits(strLeftOperand) + countNumericDigits(strRightOperand);
  const intCalculationPrecision = Math.max(
    intMinimumCalculationPrecision,
    intOperandDigits + intMaximumDecimalPlaces + 10,
  );
  const DecimalCalculation = Decimal.clone({
    precision: intCalculationPrecision,
    rounding: Decimal.ROUND_HALF_UP,
  });
  const decLeftOperand = new DecimalCalculation(
    normalizeNumericText(strLeftOperand),
  );
  const decRightOperand = new DecimalCalculation(
    normalizeNumericText(strRightOperand),
  );
  let decResult = new DecimalCalculation(0);

  switch (strOperator) {
    case "add": {
      decResult = decLeftOperand.plus(decRightOperand);
      break;
    }
    case "subtract": {
      decResult = decLeftOperand.minus(decRightOperand);
      break;
    }
    case "multiply": {
      decResult = decLeftOperand.times(decRightOperand);
      break;
    }
    case "divide": {
      decResult = decRightOperand.isZero()
        ? new DecimalCalculation(0)
        : decLeftOperand.dividedBy(decRightOperand);
      break;
    }
    default: {
      return assertNever(strOperator);
    }
  }

  return formatCalculationResult(decResult);
}

export function formatCalculationResult(decResult: Decimal): string {
  const decRoundedResult = decResult.toDecimalPlaces(
    intMaximumDecimalPlaces,
    Decimal.ROUND_HALF_UP,
  );

  if (decRoundedResult.isZero()) {
    return "0";
  }

  return decRoundedResult.toFixed();
}

function getOperatorFromSymbol(strOperatorSymbol: string): Operator {
  switch (strOperatorSymbol) {
    case "+": {
      return "add";
    }
    case "-": {
      return "subtract";
    }
    case "×": {
      return "multiply";
    }
    case "÷": {
      return "divide";
    }
    default: {
      throw new TypeError(`Unsupported operator symbol: ${strOperatorSymbol}`);
    }
  }
}

function assertValidNumericText(strNumericText: string): void {
  if (!objNumericTextPattern.test(strNumericText)) {
    throw new TypeError(`Invalid numeric text: ${strNumericText}`);
  }
}

function normalizeNumericText(strNumericText: string): string {
  if (strNumericText.endsWith(".")) {
    return strNumericText.slice(0, -1);
  }

  return strNumericText;
}

function countNumericDigits(strNumericText: string): number {
  return Array.from(strNumericText).filter(
    (strCharacter: string): boolean => strCharacter >= "0" && strCharacter <= "9",
  ).length;
}

function assertNever(strUnexpected: never): never {
  throw new TypeError(`Unhandled operator: ${String(strUnexpected)}`);
}
