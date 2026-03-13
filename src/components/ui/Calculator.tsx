"use client";

import { useState } from "react";

type Operator = "+" | "-" | "×" | "÷" | null;

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op: Operator) => {
    const current = parseFloat(display);
    if (prevValue !== null && !waitingForOperand) {
      const result = calculate(prevValue, current, operator);
      setDisplay(String(result));
      setPrevValue(result);
    } else {
      setPrevValue(current);
    }
    setOperator(op);
    setWaitingForOperand(true);
  };

  const calculate = (a: number, b: number, op: Operator): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (prevValue === null || operator === null) return;
    const current = parseFloat(display);
    const result = calculate(prevValue, current, operator);
    const resultStr = Number.isInteger(result)
      ? String(result)
      : parseFloat(result.toFixed(10)).toString();
    setDisplay(resultStr);
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const buttons = [
    { label: "AC", action: handleClear, style: "bg-slate-400 hover:bg-slate-300 text-black" },
    { label: "+/-", action: handleToggleSign, style: "bg-slate-400 hover:bg-slate-300 text-black" },
    { label: "%", action: handlePercent, style: "bg-slate-400 hover:bg-slate-300 text-black" },
    { label: "÷", action: () => handleOperator("÷"), style: `bg-amber-400 hover:bg-amber-300 text-white ${operator === "÷" && waitingForOperand ? "ring-2 ring-white" : ""}` },
    { label: "7", action: () => inputDigit("7"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "8", action: () => inputDigit("8"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "9", action: () => inputDigit("9"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "×", action: () => handleOperator("×"), style: `bg-amber-400 hover:bg-amber-300 text-white ${operator === "×" && waitingForOperand ? "ring-2 ring-white" : ""}` },
    { label: "4", action: () => inputDigit("4"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "5", action: () => inputDigit("5"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "6", action: () => inputDigit("6"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "-", action: () => handleOperator("-"), style: `bg-amber-400 hover:bg-amber-300 text-white ${operator === "-" && waitingForOperand ? "ring-2 ring-white" : ""}` },
    { label: "1", action: () => inputDigit("1"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "2", action: () => inputDigit("2"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "3", action: () => inputDigit("3"), style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "+", action: () => handleOperator("+"), style: `bg-amber-400 hover:bg-amber-300 text-white ${operator === "+" && waitingForOperand ? "ring-2 ring-white" : ""}` },
    { label: "0", action: () => inputDigit("0"), style: "bg-slate-600 hover:bg-slate-500 text-white col-span-2" },
    { label: ".", action: inputDecimal, style: "bg-slate-600 hover:bg-slate-500 text-white" },
    { label: "=", action: handleEquals, style: "bg-amber-400 hover:bg-amber-300 text-white" },
  ];

  const displayLength = display.length;
  const fontSize =
    displayLength > 12 ? "text-2xl" :
    displayLength > 9 ? "text-3xl" :
    displayLength > 6 ? "text-4xl" : "text-5xl";

  return (
    <div className="bg-black rounded-3xl shadow-2xl overflow-hidden w-80">
      {/* Display */}
      <div className="px-6 pt-8 pb-4 text-right">
        <div className="text-slate-400 text-sm h-5">
          {prevValue !== null ? `${prevValue} ${operator}` : ""}
        </div>
        <div className={`text-white font-light ${fontSize} mt-1 break-all`}>
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-px bg-slate-700 p-px">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`${btn.style} h-20 text-2xl font-medium transition-all active:scale-95 flex items-center justify-center`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
