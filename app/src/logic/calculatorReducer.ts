import {
  appendDecimalPoint,
  appendDigit,
  calculateResult,
  getOperatorSymbol,
  parseDisplay1,
} from "./calculator.ts";
import type {
  CalculatorAction,
  CalculatorState,
  Operator,
} from "./types.ts";

export const objInitialCalculatorState: CalculatorState = {
  strDisplay1: "",
  strDisplay2: "",
};

export function reduceCalculatorState(
  objState: CalculatorState,
  objAction: CalculatorAction,
): CalculatorState {
  switch (objAction.strType) {
    case "digitInput": {
      return {
        ...objState,
        strDisplay2: appendDigit(objState.strDisplay2, objAction.strDigit),
      };
    }
    case "decimalPointInput": {
      const strNextDisplay2 = appendDecimalPoint(objState.strDisplay2);

      if (strNextDisplay2 === objState.strDisplay2) {
        return objState;
      }

      return {
        ...objState,
        strDisplay2: strNextDisplay2,
      };
    }
    case "operatorInput": {
      return applyOperator(objState, objAction.strOperator);
    }
    case "calculate": {
      return calculateState(objState);
    }
    case "clearAll": {
      if (objState.strDisplay1 === "" && objState.strDisplay2 === "") {
        return objState;
      }

      return objInitialCalculatorState;
    }
    case "clearEntry": {
      if (objState.strDisplay2 === "") {
        return objState;
      }

      return {
        ...objState,
        strDisplay2: "",
      };
    }
    default: {
      return assertNever(objAction);
    }
  }
}

function applyOperator(
  objState: CalculatorState,
  strOperator: Operator,
): CalculatorState {
  const strOperatorSymbol = getOperatorSymbol(strOperator);
  const blnHasDisplay1 = objState.strDisplay1 !== "";
  const blnHasDisplay2 = objState.strDisplay2 !== "";

  if (!blnHasDisplay1 && !blnHasDisplay2) {
    return objState;
  }

  if (blnHasDisplay1 && !blnHasDisplay2) {
    const objParsedDisplay1 = parseDisplay1(objState.strDisplay1);

    return {
      strDisplay1: `${objParsedDisplay1.strLeftOperand}${strOperatorSymbol}`,
      strDisplay2: "",
    };
  }

  if (!blnHasDisplay1 && blnHasDisplay2) {
    return {
      strDisplay1: `${objState.strDisplay2}${strOperatorSymbol}`,
      strDisplay2: "",
    };
  }

  const objCalculatedState = calculateState(objState);

  return {
    strDisplay1: `${objCalculatedState.strDisplay2}${strOperatorSymbol}`,
    strDisplay2: "",
  };
}

function calculateState(objState: CalculatorState): CalculatorState {
  if (objState.strDisplay1 === "" || objState.strDisplay2 === "") {
    return objState;
  }

  const objParsedDisplay1 = parseDisplay1(objState.strDisplay1);
  const strResult = calculateResult(
    objParsedDisplay1.strLeftOperand,
    objState.strDisplay2,
    objParsedDisplay1.strOperator,
  );

  return {
    strDisplay1: "",
    strDisplay2: strResult,
  };
}

function assertNever(objUnexpected: never): never {
  throw new TypeError(`Unhandled calculator action: ${String(objUnexpected)}`);
}
