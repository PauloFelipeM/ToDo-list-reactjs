import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, FC } from "react";
import { iconVariants } from "../constants";

interface IconProps extends ComponentProps<"svg">, VariantProps<typeof iconVariants> {
  svg: FC<ComponentProps<"svg">>;
}

export default function Icon({ svg: SvgComponent, animate, className, ...props }: IconProps) {
  return <SvgComponent {...props} className={iconVariants({ animate, className })} />;
}
