import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="max-w-screen-2xl mx-auto px-4">{children}</div>;
}

export default Container;
