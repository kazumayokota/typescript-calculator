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
    expect(screen.getByLabelText("計算1")).toHaveTextContent("12345 +");
    expect(screen.getByLabelText("計算2")).toHaveTextContent("6789");

    const arrAccessibleNames: ReadonlyArray<string> = [
      "数字0", "数字1", "数字2", "数字3", "数字4", "数字5", "数字6", "数字7", "数字8", "数字9",
      "小数点", "加算", "減算", "乗算", "除算", "全体クリア", "入力クリア", "計算",
    ];

    for (const strAccessibleName of arrAccessibleNames) {
      expect(screen.getByRole("button", { name: strAccessibleName })).toBeInTheDocument();
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
