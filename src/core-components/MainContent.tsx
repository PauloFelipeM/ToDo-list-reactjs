import { cx } from "class-variance-authority";
import type { ComponentProps } from "react";

type MainContentProps = ComponentProps<"main">

export default function MainContent({
  className,
  children,
  ...props
}: MainContentProps) {
  return (
    <main className={cx("mt-4 md:mt-8", className)} {...props}>
      {children}
    </main>
  );
}
