import type { ComponentProps } from "react";
import { buttonIconVariants, buttonIconIconVariants } from "../constants";
import { type VariantProps } from "class-variance-authority";
import Icon from "./Icon";
import Skeleton from "./Skeleton";
import SpinnerIcon from "../assets/icons/spinner.svg?react";

interface ButtonIconProps
  extends Omit<ComponentProps<"button">, "size" | "disabled">,
    VariantProps<typeof buttonIconVariants> {
  loading?: boolean;
  handling?: boolean;
  icon?: ComponentProps<typeof Icon>["svg"];
}

export default function ButtonIcon({
  variant,
  size,
  disabled,
  loading,
  handling,
  className,
  icon,
  ...props
}: ButtonIconProps) {
  if (loading) {
    return (
      <Skeleton
        rounded="sm"
        className={buttonIconVariants({ variant: "none", size, className })}
      />
    );
  }

  return (
    <button
      className={buttonIconVariants({
        variant,
        size,
        disabled,
        className,
        handling,
      })}
      {...props}
    >
      {icon && (
        <Icon
          svg={handling ? SpinnerIcon : icon}
          animate={handling}
          className={buttonIconIconVariants({ variant, size })}
        />
      )}
    </button>
  );
}
