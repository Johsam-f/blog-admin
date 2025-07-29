import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline" | "send";
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "text-sm font-medium transition duration-200 ease-in-out cursor-pointer";
  const variants = {
    primary: "rounded-lg flex items-center gap-1 text-gray-400 hover:text-blue-400",
    secondary: "rounded-lg px-4 py-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-black shadow-md transition hover:bg-gray-300 cursor-pointer active:opacity-90",
    danger: "mt-2 mr-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
    send:"mt-2 mr-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center self-end"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
