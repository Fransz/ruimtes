import React from "react";
import classNames from "classnames";

// @see https://stackoverflow.com/questions/40510611
type AtMostOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Partial<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

type IButton = {
  children?: React.ReactNode;
  outline?: boolean;
  rounded?: boolean;
  onClick: (e: React.MouseEvent) => void;
  [propName: string]: unknown;
} & AtMostOne<
  {
    primary?: boolean;
    secondary?: boolean;
    succes?: boolean;
    warning?: boolean;
    danger?: boolean;
  },
  "primary" | "secondary" | "succes" | "warning" | "danger"
>;

const Button = ({
  children,
  primary,
  secondary,
  succes,
  warning,
  danger,
  outline,
  rounded,
  onClick,
  ...rest
}: IButton) => {
  const classes = classNames(
    "flex items-center px-1.5 py-1.5 border rounded group",
    (rest as { className: string }).className,
    {
      "border-blue bg-blue text-white": primary,
      "border-gray bg-gray text-white": secondary,
      "border-green bg-green text-white": succes,
      "border-yellow bg-yellow text-white": warning,
      "border-red bg-red text-white": danger,
      "text-blue bg-white": primary && outline,
      "text-gray bg-white": secondary && outline,
      "text-green bg-white": succes && outline,
      "text-yellow bg-white": warning && outline,
      "text-red bg-white": danger && outline,
      "rounded-xl": rounded,
    }
  );
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
