import { useCallback, useMemo, useState } from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";

type Operation = "+" | "-" | "×" | "÷" | null;

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation;
  waitingForNewValue: boolean;
}

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
  });

  const handleNumber = useCallback((num: string) => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: num,
          waitingForNewValue: false,
        };
      }

      if (prev.display === "0") {
        return { ...prev, display: num };
      }

      return {
        ...prev,
        display: prev.display + num,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: "0.",
          waitingForNewValue: false,
        };
      }

      if (prev.display.includes(".")) {
        return prev;
      }

      return {
        ...prev,
        display: prev.display + ".",
      };
    });
  }, []);

  const calculate = useCallback(
    (first: number, second: number, operation: Operation): number => {
      switch (operation) {
        case "+":
          return first + second;
        case "-":
          return first - second;
        case "×":
          return first * second;
        case "÷":
          return second !== 0 ? first / second : 0;
        default:
          return second;
      }
    },
    []
  );

  const handleOperation = useCallback(
    (nextOperation: Operation) => {
      setState((prev) => {
        const inputValue = parseFloat(prev.display);

        if (prev.previousValue === null) {
          return {
            ...prev,
            previousValue: inputValue,
            operation: nextOperation,
            waitingForNewValue: true,
          };
        }

        if (prev.operation) {
          const currentValue = prev.previousValue || 0;
          const newValue = calculate(currentValue, inputValue, prev.operation);

          return {
            ...prev,
            display: String(newValue),
            previousValue: newValue,
            operation: nextOperation,
            waitingForNewValue: true,
          };
        }

        return prev;
      });
    },
    [calculate]
  );

  const handleEquals = useCallback(() => {
    setState((prev) => {
      const inputValue = parseFloat(prev.display);

      if (prev.previousValue !== null && prev.operation) {
        const newValue = calculate(
          prev.previousValue,
          inputValue,
          prev.operation
        );

        return {
          display: String(newValue),
          previousValue: null,
          operation: null,
          waitingForNewValue: true,
        };
      }

      return prev;
    });
  }, [calculate]);

  const handleClear = useCallback(() => {
    setState({
      display: "0",
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
    });
  }, []);

  const handlePlusMinus = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display:
        prev.display.charAt(0) === "-"
          ? prev.display.slice(1)
          : "-" + prev.display,
    }));
  }, []);

  const handlePercentage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: String(parseFloat(prev.display) / 100),
    }));
  }, []);

  const buttonConfig = useMemo(
    () => [
      [
        { label: "AC", variant: "function" as const, action: handleClear },
        { label: "±", variant: "function" as const, action: handlePlusMinus },
        { label: "%", variant: "function" as const, action: handlePercentage },
        {
          label: "÷",
          variant: "operator" as const,
          action: () => handleOperation("÷"),
        },
      ],
      [
        {
          label: "7",
          variant: "number" as const,
          action: () => handleNumber("7"),
        },
        {
          label: "8",
          variant: "number" as const,
          action: () => handleNumber("8"),
        },
        {
          label: "9",
          variant: "number" as const,
          action: () => handleNumber("9"),
        },
        {
          label: "×",
          variant: "operator" as const,
          action: () => handleOperation("×"),
        },
      ],
      [
        {
          label: "4",
          variant: "number" as const,
          action: () => handleNumber("4"),
        },
        {
          label: "5",
          variant: "number" as const,
          action: () => handleNumber("5"),
        },
        {
          label: "6",
          variant: "number" as const,
          action: () => handleNumber("6"),
        },
        {
          label: "-",
          variant: "operator" as const,
          action: () => handleOperation("-"),
        },
      ],
      [
        {
          label: "1",
          variant: "number" as const,
          action: () => handleNumber("1"),
        },
        {
          label: "2",
          variant: "number" as const,
          action: () => handleNumber("2"),
        },
        {
          label: "3",
          variant: "number" as const,
          action: () => handleNumber("3"),
        },
        {
          label: "+",
          variant: "operator" as const,
          action: () => handleOperation("+"),
        },
      ],
      [
        {
          label: "0",
          variant: "number" as const,
          action: () => handleNumber("0")
        },
        { label: ".", variant: "number" as const, action: handleDecimal },
        { label: "=", variant: "equals" as const, action: handleEquals },
      ],
    ],
    [
      handleNumber,
      handleDecimal,
      handleOperation,
      handleEquals,
      handleClear,
      handlePlusMinus,
      handlePercentage,
    ]
  );
  return (
    <div className="mx-auto max-w-sm p-6 bg-[#333] rounded-3xl shadow-2xl">
      <CalculatorDisplay value={state.display} />
      
      <div className="grid grid-cols-4 gap-3 mt-6">
        {buttonConfig.map((row, rowIndex) =>
          row.map((button, colIndex) => (
            <CalculatorButton
              key={`${rowIndex}-${colIndex}`}
              variant={button.variant}
              onClick={button.action}
            >
              {button.label}
            </CalculatorButton>
          ))
        )}
      </div>
    </div>
  );
};

export default Calculator;
