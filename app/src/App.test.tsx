import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import App from "./App.tsx";

afterEach((): void => {
  cleanup();
});

function pressButton(strAccessibleName: string): void {
  fireEvent.click(screen.getByRole("button", { name: strAccessibleName }));
}

describe("calculator application", (): void => {
  it("数字と加算を画面操作できる", (): void => {
    render(<App />);

    pressButton("数字1");
    pressButton("加算");
    pressButton("数字2");
    pressButton("計算");

    expect(screen.getByLabelText("計算1")).toHaveTextContent(/^\s*$/);
    expect(screen.getByLabelText("計算2")).toHaveTextContent("3");
  });

  it("連続演算を左から順に計算する", (): void => {
    render(<App />);

    pressButton("数字2");
    pressButton("加算");
    pressButton("数字3");
    pressButton("乗算");
    pressButton("数字4");
    pressButton("計算");

    expect(screen.getByLabelText("計算2")).toHaveTextContent("20");
  });

  it("演算子を置き換えてCEで計算2だけをクリアする", (): void => {
    render(<App />);

    pressButton("数字8");
    pressButton("加算");
    pressButton("乗算");

    expect(screen.getByLabelText("計算1")).toHaveTextContent("8×");

    pressButton("数字2");
    pressButton("入力クリア");

    expect(screen.getByLabelText("計算1")).toHaveTextContent("8×");
    expect(screen.getByLabelText("計算2")).toHaveTextContent(/^\s*$/);
  });

  it("Cで両方の表示をクリアする", (): void => {
    render(<App />);

    pressButton("数字9");
    pressButton("除算");
    pressButton("数字3");
    pressButton("全体クリア");

    expect(screen.getByLabelText("計算1")).toHaveTextContent(/^\s*$/);
    expect(screen.getByLabelText("計算2")).toHaveTextContent(/^\s*$/);
  });

  it("小数を誤差なく計算する", (): void => {
    render(<App />);

    pressButton("数字0");
    pressButton("小数点");
    pressButton("数字1");
    pressButton("加算");
    pressButton("数字0");
    pressButton("小数点");
    pressButton("数字2");
    pressButton("計算");

    expect(screen.getByLabelText("計算2")).toHaveTextContent("0.3");
  });

  it("0除算と繰り返しイコールを設計書どおり処理する", (): void => {
    render(<App />);

    pressButton("数字8");
    pressButton("除算");
    pressButton("数字0");
    pressButton("計算");
    pressButton("計算");

    expect(screen.getByLabelText("計算1")).toHaveTextContent(/^\s*$/);
    expect(screen.getByLabelText("計算2")).toHaveTextContent("0");
  });
});
