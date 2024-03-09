import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

function SmallContainer({ children }: FormContainerProps) {
  return (
    <div className="w-full mx-auto max-w-screen-md sm:pb-16 pb-8">
      {children}
    </div>
  );
}

export default SmallContainer;
