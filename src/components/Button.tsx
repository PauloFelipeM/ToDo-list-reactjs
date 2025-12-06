import type { ComponentProps } from "react";
import { buttonTextIconVariants, buttonVariants } from "../constants";
import type { VariantProps } from "class-variance-authority";
import Icon from "./Icon";
import Text from "./Text";
import SpinnerIcon from "../assets/icons/spinner.svg?react";

interface ButtonProps
  extends Omit<ComponentProps<"button">, "size" | "disabled">,
    VariantProps<typeof buttonVariants> {
  icon?: ComponentProps<typeof Icon>["svg"];
  handling?: boolean;
}

export default function Button({
  variant,
  size,
  disabled,
  className,
  icon: IconComponent,
  handling,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({
        variant,
        size,
        disabled,
        className,
        handling,
      })}
      {...props}
    >
      {IconComponent && (
        <Icon
          svg={handling ? SpinnerIcon : IconComponent}
          animate={handling}
          className={buttonTextIconVariants({ variant, size, handling })}
        />
      )}

      <Text variant="body-md-bold">{children}</Text>
    </button>
  );
}
