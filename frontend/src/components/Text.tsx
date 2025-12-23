import { type ReactNode } from "react";

interface TextProps {
  fontSize: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  bold: boolean;
  children: ReactNode;
}
const Text = ({ fontSize, bold = false, children }: TextProps) => {
  const fontSizeClass = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  };
  const boldClass = bold ? "font-bold" : "font-normal";

  return (
    <div className={`${fontSizeClass[fontSize]} ${boldClass}`}>{children}</div>
  );
};

export default Text;
