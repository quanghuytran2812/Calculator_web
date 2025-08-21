interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay = ({ value }: CalculatorDisplayProps) => {
  const formatDisplay = (val: string) => {
    // Handle very long numbers
    if (val.length > 12) {
      const num = parseFloat(val);
      if (Math.abs(num) >= 1e12) {
        return num.toExponential(5);
      }
      return num.toFixed(8 - Math.floor(Math.log10(Math.abs(num))));
    }
    return val;
  };
  return (
    <div className="bg-[#a7af7c] rounded-2xl p-6 mb-6">
      <div className="text-right">
        <div className="text-4xl font-mono font-light min-h-[3rem] flex items-end justify-end">
          {formatDisplay(value)}
        </div>
      </div>
    </div>
  );
};

export default CalculatorDisplay;
