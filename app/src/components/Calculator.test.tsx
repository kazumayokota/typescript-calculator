import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Calculator } from "./Calculator.tsx";

afterEach((): void => {
  cleanup();
});

describe("Calculator UI", (): void => {
  it("設計書の2つの表示と全ボタンを表示する", (): void => {
    const fnHandlePress = vi.fn();

    render(
      <Calculator
        fnHandleCalculatePress={fnHandlePress}
        fnHandleClearAllPress={fnHandlePress}
        fnHandleClearEntryPress={fnHandlePress}
        fnHandleDecimalPointPress={fnHandlePress}
        fnHandleDigitPress={fnHandlePress}
        fnHandleOperatorPress={fnHandlePress}
        strDisplay1="12345 +"
        strDisplay2="6789"
      />,
    );

    expect(screen.getByRole("region", { name: "計算機" })).toBeInTheDocument();
    expect(screen.getByLabelText("計算1")).toHaveAttribute("id", "lblLogic1");
    expect(screen.getByLabelText("計算1")).toHaveTextContent("12345 +");
    expect(screen.getByLabelText("計算2")).toHaveAttribute("id", "lblLogic2");
    expect(screen.getByLabelText("計算2")).toHaveTextContent("6789");

    const arrButtonDefinitions: ReadonlyArray<Readonly<{ strAccessibleName: string; strControlId: string }>> = [
      { strAccessibleName: "数字0", strControlId: "btn0" },
      { strAccessibleName: "数字1", strControlId: "btn1" },
      { strAccessibleName: "数字2", strControlId: "btn2" },
      { strAccessibleName: "数字3", strControlId: "btn3" },
      { strAccessibleName: "数字4", strControlId: "btn4" },
      { strAccessibleName: "数字5", strControlId: "btn5" },
      { strAccessibleName: "数字6", strControlId: "btn6" },
      { strAccessibleName: "数字7", strControlId: "btn7" },
      { strAccessibleName: "数字8", strControlId: "btn8" },
      { strAccessibleName: "数字9", strControlId: "btn9" },
      { strAccessibleName: "小数点", strControlId: "btnShosuten" },
      { strAccessibleName: "加算", strControlId: "btnLogicPlus" },
      { strAccessibleName: "減算", strControlId: "btnLogicMinus" },
      { strAccessibleName: "乗算", strControlId: "btnLogicMultiplication" },
      { strAccessibleName: "除算", strControlId: "btnLogicDivision" },
      { strAccessibleName: "全体クリア", strControlId: "btnC" },
      { strAccessibleName: "入力クリア", strControlId: "btnCe" },
      { strAccessibleName: "計算", strControlId: "btnEqual" },
    ];

    for (const objButtonDefinition of arrButtonDefinitions) {
      expect(
        screen.getByRole("button", { name: objButtonDefinition.strAccessibleName }),
      ).toHaveAttribute("id", objButtonDefinition.strControlId);
    }
  });

  it("押したキーを型付きコールバックへ通知する", (): void => {
    const fnHandleDigitPress = vi.fn();
    const fnHandleOperatorPress = vi.fn();
    const fnHandlePress = vi.fn();

    render(
      <Calculator
        fnHandleCalculatePress={fnHandlePress}
        fnHandleClearAllPress={fnHandlePress}
        fnHandleClearEntryPress={fnHandlePress}
        fnHandleDecimalPointPress={fnHandlePress}
        fnHandleDigitPress={fnHandleDigitPress}
        fnHandleOperatorPress={fnHandleOperatorPress}
        strDisplay1=""
        strDisplay2=""
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "数字7" }));
    fireEvent.click(screen.getByRole("button", { name: "加算" }));

    expect(fnHandleDigitPress).toHaveBeenCalledWith("7");
    expect(fnHandleOperatorPress).toHaveBeenCalledWith("add");
  });
});
