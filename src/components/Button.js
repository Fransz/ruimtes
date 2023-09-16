import React from "react";
import classNames from "classnames";

const Button = ({
  children,
  primary,
  secondary,
  succes,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) => {
  const classes = classNames(
    "flex items-center px-3 py-1.5 border rounded group",
    rest.className,
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
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const cnt =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (cnt > 1)
      return new Error(
        "Only one of primary, secondary, success, warning, danger can be true"
      );
  },
};
export default Button;
