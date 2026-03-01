import { Suspense, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Loadable = ({ children }: Props) => {
  return (
    <Suspense fallback={<div className="page-loader">Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default Loadable;