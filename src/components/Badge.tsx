import type { ComponentProps } from "react";
import Text from "./Text";
import { badgeTextVariants, badgeVariants } from "../constants";
import { cva, cx, type VariantProps } from "class-variance-authority";
import Skeleton from "./Skeleton";

const badgeCheckboxIconVariants = cva("", {
  variants: {
    size: {
      sm: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface BadgeProps
  extends ComponentProps<"div">,
    VariantProps<typeof badgeVariants> {
  loading?: boolean;
  children: React.ReactNode;
}

export default function Badge({
  variant,
  size,
  className,
  loading,
  children,
  ...props
}: BadgeProps) {
  if (loading) {
    return (
      <Skeleton
        rounded="full"
        className={cx(
          badgeVariants({ variant, size }),
          badgeCheckboxIconVariants({ size }),
          className
        )}
      />
    );
  }

  return (
    <div className={badgeVariants({ variant, size, className })} {...props}>
      <Text className={badgeTextVariants({ variant })}>{children}</Text>
    </div>
  );
}
