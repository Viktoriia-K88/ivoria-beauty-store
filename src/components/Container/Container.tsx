import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-site px-5 md:px-8 lg:px-10">
      {children}
    </div>
  );
}

export default Container;
