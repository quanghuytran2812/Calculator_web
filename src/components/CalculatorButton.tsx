import type { ReactNode } from "react";
import { cn } from '../lib/utils';

type ButtonVariant = "number" | "operator" | "function" | "equals";

interface CalculatorButtonProps {
  children: ReactNode;
  variant: ButtonVariant;
  onClick: () => void;
}

const buttonVariants = {
  number: "bg-gradient-to-b from-[#2f2f2f] to-[#3f3f3f] text-white hover:brightness-110",
  operator: "bg-gradient-to-b from-[#2f2f2f] to-[#3f3f3f] text-[#FFA500] hover:brightness-110",
  function: "bg-gradient-to-b from-[#2f2f2f] to-[#3f3f3f] text-[#FFA500] hover:brightness-110",
  equals: "bg-gradient-to-b from-[#FFB75E] to-[#ED8F03] text-white hover:brightness-110",
};

const CalculatorButton = ({
  children,
  variant,
  onClick
}: CalculatorButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-16 rounded-2xl font-medium text-xl transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-white/20",
        buttonVariants[variant],
        variant === "equals" && "col-span-2"
      )}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
