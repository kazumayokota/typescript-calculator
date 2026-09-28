import { useReducer } from "react";
import type { ReactElement } from "react";

import { Calculator } from "./components/Calculator.tsx";
import {
  objInitialCalculatorState,
  reduceCalculatorState,
} from "./logic/calculatorReducer.ts";
import type { Digit, Operator } from "./logic/types.ts";

import "./App.css";

function App(): ReactElement {
  const [objCalculatorState, fnDispatch] = useReducer(
    reduceCalculatorState,
    objInitialCalculatorState,
  );

  const fnHandleDigitPress = (strDigit: Digit): void => {
    fnDispatch({ strType: "digitInput", strDigit });
  };

  const fnHandleDecimalPointPress = (): void => {
    fnDispatch({ strType: "decimalPointInput" });
  };

  const fnHandleOperatorPress = (strOperator: Operator): void => {
    fnDispatch({ strType: "operatorInput", strOperator });
  };

  const fnHandleCalculatePress = (): void => {
    fnDispatch({ strType: "calculate" });
  };

  const fnHandleClearAllPress = (): void => {
    fnDispatch({ strType: "clearAll" });
  };

  const fnHandleClearEntryPress = (): void => {
    fnDispatch({ strType: "clearEntry" });
  };

  return (
    <main className="app-shell">
      <div className="app-shell__heading">
        <p className="app-shell__eyebrow">REACT + TYPESCRIPT</p>
        <h1>計算機</h1>
        <p>詳細設計書の仕様に基づいて動作します。</p>
      </div>
      <Calculator
        fnHandleCalculatePress={fnHandleCalculatePress}
        fnHandleClearAllPress={fnHandleClearAllPress}
        fnHandleClearEntryPress={fnHandleClearEntryPress}
        fnHandleDecimalPointPress={fnHandleDecimalPointPress}
        fnHandleDigitPress={fnHandleDigitPress}
        fnHandleOperatorPress={fnHandleOperatorPress}
        strDisplay1={objCalculatorState.strDisplay1}
        strDisplay2={objCalculatorState.strDisplay2}
      />
      <p className="app-shell__note">
        Cはすべてクリア、CEは入力中の値だけをクリアします。
      </p>
    </main>
  );
}

export default App;
