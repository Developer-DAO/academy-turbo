import { ReloadIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { type ButtonHTMLAttributes, forwardRef, type ForwardRefRenderFunction } from "react";

import { commonStyles, variantStyles } from "./styles";
import type { Variant } from "./types";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
}

const ButtonComponent: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { className, variant = "default", isLoading = false, ...rest } = props;
  const finalClassName = clsx(commonStyles, variantStyles[variant], className);
  if (isLoading)
    return (
      <button className={finalClassName} ref={ref} {...rest} disabled>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        {props.children}
      </button>
    );
  return <button className={finalClassName} ref={ref} {...rest} />;
};

export const Button = forwardRef(ButtonComponent);
