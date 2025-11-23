import type { PropsWithChildren } from "react";
import { Suspense } from "react";

export const React19Provider = ({ children }: PropsWithChildren) => {
  return <Suspense fallback={null}>{children}</Suspense>;
};
