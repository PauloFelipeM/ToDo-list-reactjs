import { type VariantProps } from "class-variance-authority";
import { createElement, type JSX } from "react";
import { textVariants } from "../constants";

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "span",
  variant,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    as,
    { className: textVariants({ variant, className }), ...props },
    children
  );
}
