import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function OTP({ otpDigitCount }: { otpDigitCount: number }) {
  const [inputArr, setInputArr] = useState<Array<number>>(
    Array.from({ length: otpDigitCount }),
  );
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    inputRef.current?.[0]?.focus();
  }, []);
  const handleOnChange = (e: any, index: number) => {
    const val = e.target.value;
    console.log("event", val);
    if (isNaN(val)) return;
    inputArr[index] = val.slice(-1); // important 1 liner to just allow a single input
    const updateArr = [...inputArr];
    setInputArr(updateArr);
    if (index < otpDigitCount - 1 && val.trim()) {
      inputRef.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    // this check !e.target.value is imporant otherwise it will focus to another input and clear later
    if (!e.target.value && e.key === "Backspace") {
      inputRef.current?.[index - 1]?.focus();
    }
  };

  return (
    <div>
      <div className="p-8 flex justify-center items-center flex-col">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-bold mt-4">OTP Input</h2>
      </div>
      <div className="flex justify-center gap-1">
        {inputArr.map((_, index) => {
          return (
            <input
              type="text"
              onChange={(e) => handleOnChange(e, index)}
              key={index}
              ref={(el) => {
                inputRef.current[index] = el;
              }}
              value={inputArr[index]}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
}
