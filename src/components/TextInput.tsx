import { cva, cx, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { textVariants } from "../constants";

const inputTextVariants = cva(
  "border-b border-solid border-gray-200 focus-border-pink-base bg-transparent outline-none",
  {
    variants: {
      size: {
        sm: "pb-2 px-2",
      },
      disabled: {
        true: "pointer-events-none",
      },
    },
    defaultVariants: {
      size: "sm",
      disabled: false,
    },
  }
);

interface TextInputProps
  extends Omit<ComponentProps<"input">, "size" | "disabled">,
    VariantProps<typeof inputTextVariants> {}

export default function TextInput({
  size,
  disabled,
  className,
  ...props
}: TextInputProps) {
  return (
    <input
      className={cx(
        inputTextVariants({ size, disabled, className }),
        textVariants(),
        className
      )}
      {...props}
    />
  );
}
